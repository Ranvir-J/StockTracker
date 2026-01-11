package main

import (
	"context"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type part struct { // format for a singular part from json file
	var partNum 
	var quantity string

}

type IngestRequest struct { // format of the JSON expected by backend
	Type    string                 `json:"type"`
	Payload map[string]any         `json:"payload" binding:"required"`
}

type StoredDoc struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID    string             `bson:"userId" json:"userId"`
	Type      string             `bson:"type" json:"type"`
	Payload   map[string]any      `bson:"payload" json:"payload"`
	CreatedAt time.Time           `bson:"createdAt" json:"createdAt"`
	Source    string             `bson:"source" json:"source"`
}

func main() {
	// load .env
	_ = godotenv.Load()

	// verify .env variables
	mongoURI := mustGet("MONGODB_URI")
	dbName := mustGet("MONGODB_DB")
	collName := mustGet("MONGODB_COLL")
	apiKey := mustGet("API_KEY")
	extID := mustGet("CHROME_EXTENSION_ID")
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// MongoDB connection
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		panic(err)
	}
	defer func() {
		_ = client.Disconnect(context.Background())
	}()

	// verify connection with MongoDB
	if err := client.Ping(ctx, nil); err != nil {
		panic(err)
	}

	coll := client.Database(dbName).Collection(collName)

	// gin setup
	router := gin.New()
	router.Use(gin.Logger(), gin.Recovery())
	router.Use(corsForExtension(extID))

	v1 := router.Group("/v1")
	v1.Use(apiKeyAuth(apiKey))

	v1.POST("/ingest", func(c *gin.Context) {
		var req IngestRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// temp optional userid header
		userID := c.GetHeader("X-User-Id")
		if userID == "" {
			userID = "anonymous"
		}

		doc := StoredDoc{
			UserID:    userID,
			Type:      req.Type,
			Payload:   req.Payload,
			CreatedAt: time.Now().UTC(),
			Source:    "chrome_extension",
		}

		result, err := coll.InsertOne(c.Request.Context(), doc)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "db insert failed"})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"id": result.InsertedID})
	})

	if err := router.Run(":" + port); err != nil {
		panic(err)
	}
}

func mustGet(key string) string {
	v := os.Getenv(key)
	if v == "" {
		panic("missing env var: " + key)
	}
	return v
}

func apiKeyAuth(expected string) gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.GetHeader("X-Api-Key") != expected {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}
		c.Next()
	}
}

func corsForExtension(extensionID string) gin.HandlerFunc {
	allowed := "chrome-extension://" + extensionID

	return func(c *gin.Context) {
		origin := c.GetHeader("Origin")
		if origin == allowed {
			c.Header("Access-Control-Allow-Origin", origin)
			c.Header("Vary", "Origin")
			c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
			c.Header("Access-Control-Allow-Headers", "Content-Type, X-Api-Key, X-User-Id")
		}

		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

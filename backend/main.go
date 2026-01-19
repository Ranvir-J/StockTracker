package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"stBackend/config"
	"stBackend/controller"
	"stBackend/helper"
	"stBackend/repository"
	"stBackend/router"
	"stBackend/service"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error while loading environment variables ", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	db, err := config.ConnectDB()
	helper.ErrorPanic(err)

	defer db.Disconnect()

	// repository

	postRepo := repository.NewPostRepo(db)

	// service
	postService := service.NewPostServiceImplement(postRepo)

	// controller
	postController := controller.NewPostController(postService)

	// router
	routes := router.NewRouter(postController)

	//db.IsErrUniqueConstraint()

	server := &http.Server{
		Addr:           ":" + port,
		Handler:        routes,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20, // one megabyte (bitshift)
	}

	server_err := server.ListenAndServe()
	if server_err != nil {
		panic(server_err)
	}

}

package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"stBackend/config"
	"stBackend/helper"

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

	//db.IsErrUniqueConstraint()

	server := &http.Server{
		Addr:           ":" + port,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20, // one megabyte (bitshift)
	}

	server_err := server.ListenAndServe()
	if server_err != nil {
		panic(server_err)
	}

}

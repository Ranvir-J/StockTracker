package config

import (
	"fmt"
	"stBackend/prisma/db"
)

func connectDB() (*db.PrismaClient, error) {
	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		return nil, err
	}

	fmt.Println("Connection to DB successful twin")
	return client, nil
}

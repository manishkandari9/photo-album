package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// MongoDB URI
	uri := "mongodb+srv://manishkandari43:6Azjxsf6zYwTNpGA@golangg.svn8i.mongodb.net/smart inventory retryWrites=true&w=majority&appName=Golangg"

	// Create MongoDB client options
	clientOptions := options.Client().ApplyURI(uri)

	// Create a context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Initialize MongoDB client
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatalf("Error connecting to MongoDB: %v", err)
	}

	// Verify connection with a ping
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatalf("Error pinging MongoDB: %v", err)
	}

	fmt.Println("Successfully connected to MongoDB!")

	// Ensure disconnection when the program ends
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			log.Fatalf("Error disconnecting MongoDB: %v", err)
		}
	}()
}

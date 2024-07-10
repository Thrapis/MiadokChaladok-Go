package main

import (
	"fmt"

	"miadok-chaladok/internal/config"
	"miadok-chaladok/internal/routers"
)

func main() {
	// Getting bot configuration
	cfg := config.GetConfig()
	fmt.Println(cfg)

	config.GetStorage()

	// Executing of application workflow
	startServer(cfg)
}

func startServer(cfg *config.Config) {

	router := routers.SetupRouter(cfg)

	router.Run(":8080")
}

package main

import (
	"fmt"

	"miadok-chaladok/internal/config"
)

func main() {
	// Executing of application workflow
	appConfig := config.GetConfig()
	log := config.NewLogrusLogger(appConfig)
	db := config.NewPostgresDatabase(appConfig, log)
	storage := config.NewRedisStorage(appConfig)
	app := config.NewGin(appConfig)

	config.Startup(&config.StartupConfig{
		Config:  appConfig,
		Log:     log,
		App:     app,
		DB:      db,
		Storage: storage,
	})

	err := app.Run(fmt.Sprintf(":%d", appConfig.App.Port))
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

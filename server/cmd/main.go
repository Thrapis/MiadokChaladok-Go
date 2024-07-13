package main

import (
	"fmt"

	"miadok-chaladok/internal/config"
	// "miadok-chaladok/internal/routers"
)

func main() {
	// Executing of application workflow
	appConfig := config.GetConfig()
	log := config.NewLogger(appConfig)
	db := config.NewDatabase(appConfig, log)
	storage := config.NewStorage(appConfig)
	app := config.NewGin(appConfig)
	// validate := config.NewValidator(appConfig)
	// producer := config.NewKafkaProducer(viperConfig, log)

	config.Startup(&config.StartupConfig{
		Config:  appConfig,
		Log:     log,
		App:     app,
		DB:      db,
		Storage: storage,
		// Validate: validate,
		// Producer: producer,
	})

	err := app.Run(fmt.Sprintf(":%d", appConfig.App.Port))
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

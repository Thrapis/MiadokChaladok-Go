package config

import (
	"fmt"
	"time"

	"miadok-chaladok/internal/app"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// NewPostgresDatabase - returns configurated postgres gorm.DB client.
func NewPostgresDatabase(config *Config, log app.ILogger) *gorm.DB {
	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		config.Database.Host, config.Database.Port, config.Database.User, config.Database.Password, config.Database.DbName)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.New(log, logger.Config{
			SlowThreshold:             time.Second * 5,
			Colorful:                  true,
			IgnoreRecordNotFoundError: true,
			ParameterizedQueries:      true,
			LogLevel:                  logger.Info,
		}),
	})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	connection, err := db.DB()
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	connection.SetMaxIdleConns(config.Database.Pool.Idle)
	connection.SetMaxOpenConns(config.Database.Pool.Max)
	connection.SetConnMaxLifetime(time.Second * time.Duration(config.Database.Pool.Lifetime))

	return db
}

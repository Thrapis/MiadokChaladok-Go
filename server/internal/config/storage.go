package config

import (
	"log"
	"miadok-chaladok/pkg/storage"
	"miadok-chaladok/pkg/storage/redis"
)

func NewStorage(config *Config) storage.StorageOperator {
	storageConfig := redis.StorageConfig{
		Host:     config.Storage.Host,
		Port:     config.Storage.Port,
		Password: config.Storage.Password,
		Db:       config.Storage.Db,
	}

	storage, err := redis.NewStorage(storageConfig)
	if err != nil {
		log.Fatalf("failed to connect storage: %v", err)
	}

	return storage
}

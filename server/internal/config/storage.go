package config

import (
	"miadok-chaladok/pkg/storage"
	"miadok-chaladok/pkg/storage/redis"
	"sync"
)

var storageInstance storage.StorageOperator
var storageOnce sync.Once

func GetStorage() storage.StorageOperator {
	storageOnce.Do(func() {

		cfg := GetConfig()

		redisCfg := redis.StorageConfig{
			Host:     cfg.Redis.Host,
			Port:     cfg.Redis.Port,
			Password: cfg.Redis.Password,
			Db:       cfg.Redis.Db,
		}

		storage, err := redis.NewStorage(redisCfg)
		if err != nil {
			panic(err)
		}

		storageInstance = storage
	})

	return storageInstance
}

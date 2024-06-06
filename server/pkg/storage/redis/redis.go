package redis

import (
	"fmt"

	"github.com/go-redis/redis"
)

var _ Storage = &redisStorage{}

// redisStorage - implement storage interface using Redis.
type redisStorage struct {
	client *redis.Client
}

// StorageConfig - define storage configuration.
type StorageConfig struct {
	Host     string
	Port     int32
	Password string
	Db       int
}

// Storage - represent entity for store bot work data.
type Storage interface {
	// Set - save/update user info by key
	Set(key, value string) error

	// Get - retrieve user info by key
	Get(key string) (string, error)

	// Del - delete user info by key
	Del(key string) error
}

// New - instantiate redis storage.
func New(cfg StorageConfig) (Storage, error) {
	rdb := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%d", cfg.Host, cfg.Port),
		Password: cfg.Password,
		DB:       cfg.Db,
	})

	_, err := rdb.Ping().Result()
	if err != nil {
		return nil, err
	}

	return &redisStorage{client: rdb}, nil
}

// Set - save/update info in storage.
func (r *redisStorage) Set(key, value string) error {
	_, err := r.client.Set(key, value, 0).Result()
	if err != nil {
		return err
	}
	return nil
}

// Get - retrieve info from storage.
func (r *redisStorage) Get(key string) (string, error) {
	userInfo, err := r.client.Get(key).Result()
	if err != nil {
		return "", err
	}
	return userInfo, nil
}

// Del - remove info from storage.
func (r *redisStorage) Del(key string) error {
	_, err := r.client.Del(key).Result()
	if err != nil {
		return err
	}
	return nil
}

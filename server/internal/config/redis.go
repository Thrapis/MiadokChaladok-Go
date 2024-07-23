package config

import (
	"context"
	"fmt"
	"log"
	"time"

	redis "github.com/redis/go-redis/v9"
)

// redisStorage - implement storage interface using Redis.
type redisStorage struct {
	client *redis.Client
}

// NewRedisStorage - instantiate redis storage.
func NewRedisStorage(config *Config) *redisStorage {
	rdb := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%d", config.Storage.Host, config.Storage.Port),
		Password: config.Storage.Password,
		DB:       config.Storage.Db,
	})

	err := rdb.Ping(context.Background()).Err()
	if err != nil {
		log.Fatalf("failed to connect storage: %v", err)
	}

	return &redisStorage{client: rdb}
}

// Del - delete value from storage.
func (s *redisStorage) Del(ctx context.Context, key string) error {
	_, err := s.client.Del(ctx, key).Result()
	return err
}

// SetString - save/update string value in storage.
func (s *redisStorage) SetString(ctx context.Context, key string, value string, expiration time.Duration) error {
	_, err := s.client.Set(ctx, key, value, expiration).Result()
	return err
}

// GetString - retrieve string value from storage.
func (s *redisStorage) GetString(ctx context.Context, key string) (string, error) {
	return s.client.Get(ctx, key).Result()
}

// SetStruct - save/update struct value in storage.
func (s *redisStorage) SetStruct(ctx context.Context, key string, value interface{}, expiration time.Duration) error {
	_, err := s.client.Set(ctx, key, value, expiration).Result()
	return err
}

// GetStruct - retrieve struct value from storage.
func (s *redisStorage) GetStruct(ctx context.Context, key string, value interface{}) error {
	return s.client.Get(ctx, key).Scan(value)
}

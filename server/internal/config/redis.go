package config

import (
	"context"
	"fmt"
	"log"
	"time"

	redis "github.com/redis/go-redis/v9"
)

// RedisStorage - implements storage interface using Redis.
type RedisStorage struct {
	client *redis.Client
}

// NewRedisStorage - instantiate redis storage.
func NewRedisStorage(config *Config) *RedisStorage {
	rdb := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%d", config.Storage.Host, config.Storage.Port),
		Password: config.Storage.Password,
		DB:       config.Storage.Db,
	})

	err := rdb.Ping(context.Background()).Err()
	if err != nil {
		log.Fatalf("failed to connect storage: %v", err)
	}

	return &RedisStorage{client: rdb}
}

// Del - delete value from storage.
func (s *RedisStorage) Del(ctx context.Context, key string) error {
	_, err := s.client.Del(ctx, key).Result()
	return err
}

// SetString - save/update string value in storage.
func (s *RedisStorage) SetString(ctx context.Context, key string, value string, expiration time.Duration) error {
	_, err := s.client.Set(ctx, key, value, expiration).Result()
	return err
}

// GetString - retrieve string value from storage.
func (s *RedisStorage) GetString(ctx context.Context, key string) (string, error) {
	return s.client.Get(ctx, key).Result()
}

// SetStruct - save/update struct value in storage.
func (s *RedisStorage) SetStruct(ctx context.Context, key string, value interface{}, expiration time.Duration) error {
	_, err := s.client.Set(ctx, key, value, expiration).Result()
	return err
}

// GetStruct - retrieve struct value from storage.
func (s *RedisStorage) GetStruct(ctx context.Context, key string, value interface{}) error {
	return s.client.Get(ctx, key).Scan(value)
}

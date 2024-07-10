package redis

import (
	"context"
	"miadok-chaladok/pkg/storage"
	"time"

	redis "github.com/redis/go-redis/v9"
)

// redisTransaction - implement transaction interface using Redis.
type redisTransaction struct {
	storage.TransactionOperator
	pipeliner *redis.Pipeliner
}

// Del - delete value from storage transactionally.
func (p *redisTransaction) Del(ctx context.Context, key string) error {
	_, err := (*p.pipeliner).Del(ctx, key).Result()
	return err
}

// SetString - save/update string value in storage transactionally.
func (p *redisTransaction) SetString(ctx context.Context, key string, value string, expiration time.Duration) error {
	_, err := (*p.pipeliner).Set(ctx, key, value, expiration).Result()
	return err
}

// GetString - retrieve string value from storage transactionally.
func (p *redisTransaction) GetString(ctx context.Context, key string) (string, error) {
	return (*p.pipeliner).Get(ctx, key).Result()
}

// SetStruct - save/update struct value in storage transactionally.
func (p *redisTransaction) SetStruct(ctx context.Context, key string, value interface{}, expiration time.Duration) error {
	_, err := (*p.pipeliner).Set(ctx, key, value, expiration).Result()
	return err
}

// GetStruct - retrieve struct value from storage transactionally.
func (p *redisTransaction) GetStruct(ctx context.Context, key string, value interface{}) error {
	return (*p.pipeliner).Get(ctx, key).Scan(value)
}

// ExecTransaction - execute transaction of operations.
func (p *redisTransaction) ExecTransaction(ctx context.Context) error {
	_, err := (*p.pipeliner).Exec(ctx)
	return err
}

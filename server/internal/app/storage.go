package app

import (
	"context"
	"time"
)

// IStorage - represent interface for application storage that can make operations over cache data.
type IStorage interface {
	// Del - delete value by key.
	Del(ctx context.Context, key string) error

	// SetString - save/update string value by key.
	SetString(ctx context.Context, key string, value string, expiration time.Duration) error

	// GetString - retrieve string value by key.
	GetString(ctx context.Context, key string) (string, error)

	// SetStruct - save/update struct value in storage.
	SetStruct(ctx context.Context, key string, value interface{}, expiration time.Duration) error

	// GetString - retrieve struct value by key.
	GetStruct(ctx context.Context, key string, value interface{}) error
}

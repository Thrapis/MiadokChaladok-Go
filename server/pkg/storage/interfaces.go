package storage

import (
	"context"
	"time"
)

// Operator - represent entity that can make operations over cache data.
type Operator interface {
	// Del - delete value by key
	Del(ctx context.Context, key string) error

	// SetString - save/update string value by key
	SetString(ctx context.Context, key string, value string, expiration time.Duration) error

	// GetString - retrieve string value by key
	GetString(ctx context.Context, key string) (string, error)

	// SetStruct - save/update struct value in storage.
	SetStruct(ctx context.Context, key string, value interface{}, expiration time.Duration) error

	// GetString - retrieve struct value by key
	GetStruct(ctx context.Context, key string, value interface{}) error
}

// Storager - represent entity for cache data.
type StorageOperator interface {
	Operator
	StartTransaction() TransactionOperator
}

// Transactioner - represent entity for cache transaction.
type TransactionOperator interface {
	Operator
	ExecTransaction(ctx context.Context) error
}

package redis

import (
	"fmt"

	"github.com/gin-contrib/sessions"
	ginRedisStore "github.com/gin-contrib/sessions/redis"
)

// NewStore - instantiate redis store.
func NewStore(cfg StorageConfig, size int, secret []byte) (sessions.Store, error) {
	address := fmt.Sprintf("%s:%d", cfg.Host, cfg.Port)
	return ginRedisStore.NewStore(size, "tcp", address, cfg.Password, secret)
}

package redis

// StorageConfig - define storage configuration.
type StorageConfig struct {
	Host     string
	Port     int32
	Password string
	Db       int
}

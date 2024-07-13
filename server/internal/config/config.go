package config

import (
	"log"
	"sync"

	"github.com/ilyakaznacheev/cleanenv"
)

// Config - defines all configuration of the server application.
type Config struct {
	DebugMode   bool   `yaml:"debug" env:"API_DEBUG" env-description:"server app debug mode"`
	StoreSecret string `yaml:"store-secret" env:"STORE_SECRET" env-description:"server app store secret"`
	// Represent log configuration
	Log LogConfig `yaml:"log"`
	// Represent app configuration
	App AppConfig `yaml:"app"`
	// Represent web configuration
	Web WebConfig `yaml:"web"`
	// Represent (key/value) storage configuration
	Storage StorageConfig `yaml:"storage"`
	// Represent database configuration
	Database DatabaseConfig `yaml:"database"`
}

// LogConfig - defines log configuration.
type LogConfig struct {
	Level int `yaml:"level" env:"LOG_LEVEL" env-description:"log level"`
}

// AppConfig - defines app configuration.
type AppConfig struct {
	Port int `yaml:"port" env:"APP_PORT" env-description:"app port" env-required:"true"`
}

// WebConfig - defines web configuration.
type WebConfig struct {
	Host string `yaml:"host" env:"WEB_HOST" env-description:"web host" env-required:"true"`
	Port int    `yaml:"port" env:"WEB_PORT" env-description:"web port" env-required:"true"`
}

// StorageConfig - defines storage configuration.
type StorageConfig struct {
	Host     string `yaml:"host" env:"STORAGE_HOST" env-description:"storage host" env-required:"true"`
	Port     int32  `yaml:"port" env:"STORAGE_PORT" env-description:"storage port" env-required:"true"`
	Password string `yaml:"password" env:"STORAGE_PASSWORD" env-description:"storage password"`
	Db       int    `yaml:"db" env:"STORAGE_DB" env-description:"storage database"`
}

// DatabaseConfig - defines database configuration.
type DatabaseConfig struct {
	Driver   string `yaml:"driver" env:"DATABASE_DRIVER" env-description:"database driver"`
	Host     string `yaml:"host" env:"DATABASE_HOST" env-description:"database host" env-required:"true"`
	Port     int32  `yaml:"port" env:"DATABASE_PORT" env-description:"database port" env-required:"true"`
	User     string `yaml:"user" env:"DATABASE_USER" env-description:"database user" env-required:"true"`
	Password string `yaml:"password" env:"DATABASE_PASSWORD" env-description:"database password" env-required:"true"`
	DbName   string `yaml:"dbname" env:"DATABASE_DB" env-description:"database dbname" env-required:"true"`
	// Represent database pool configuration
	Pool DatabasePoolConfig `yaml:"pool"`
}

// DatabasePoolConfig - defines database pool configuration.
type DatabasePoolConfig struct {
	Idle     int   `yaml:"idle" env:"DATABASE_POOL_IDLE" env-description:"database max idle connections"`
	Max      int   `yaml:"max" env:"DATABASE_POOL_MAX" env-description:"database max open connections"`
	Lifetime int64 `yaml:"lifetime" env:"DATABASE_POOL_LIFETIME" env-description:"database max time (in seconds) a connection may be reused"`
}

const configPath = "configs/config.yaml"

var configInstance *Config
var configOnce sync.Once

// GetConfig returns app configuration.
func GetConfig() *Config {
	configOnce.Do(func() {

		configInstance = &Config{}

		if err := cleanenv.ReadConfig(configPath, configInstance); err != nil {
			help, _ := cleanenv.GetDescription(configInstance, nil)
			log.Println(help)
			log.Fatal(err)
		}

		err := cleanenv.ReadEnv(configInstance)
		if err != nil {
			log.Fatal(err)
		}

	})
	return configInstance
}

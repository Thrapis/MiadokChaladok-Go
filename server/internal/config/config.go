package config

import (
	"log"
	"sync"

	"github.com/ilyakaznacheev/cleanenv"
)

// Config - defines all configuration of the server application.
type Config struct {
	// Provide addition info in responses with user conversation
	DebugMode bool `yaml:"debug" env:"API_DEBUG" env-description:"Server app debug mode"`
	// Secret code for server app sessions store
	StoreSecret string `yaml:"store-secret" env:"STORE_SECRET" env-description:"Server app store secret"`
	// Represent redis configuration
	Redis RedisConfig `yaml:"redis"`
	// Represent database configuration
	Database DatabaseConfig `yaml:"database"`
}

// RedisConfig - defines redis storage configuration.
type RedisConfig struct {
	Host     string `yaml:"host" env:"REDIS_HOST" env-description:"redis host" env-required:"true"`
	Port     int32  `yaml:"port" env:"REDIS_PORT" env-description:"redis port" env-required:"true"`
	Password string `yaml:"password" env:"REDIS_PASSWORD" env-description:"redis password"`
	Db       int    `yaml:"db" env:"REDIS_DB" env-description:"redis database"`
}

// DatabaseConfig - defines database storage configuration.
type DatabaseConfig struct {
	Driver   string `yaml:"driver" env:"DATABASE_DRIVER" env-description:"database driver"`
	Host     string `yaml:"host" env:"DATABASE_HOST" env-description:"database host" env-required:"true"`
	Port     int32  `yaml:"port" env:"DATABASE_PORT" env-description:"database port" env-required:"true"`
	User     string `yaml:"user" env:"DATABASE_USER" env-description:"database user" env-required:"true"`
	Password string `yaml:"password" env:"DATABASE_PASSWORD" env-description:"database password" env-required:"true"`
	DbName   string `yaml:"dbname" env:"DATABASE_DB" env-description:"database dbname" env-required:"true"`
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

package config

import (
	"github.com/sirupsen/logrus"
)

func NewLogger(config *Config) *logrus.Logger {
	log := logrus.New()

	log.SetLevel(logrus.Level(config.Log.Level))
	log.SetFormatter(&logrus.JSONFormatter{})

	return log
}

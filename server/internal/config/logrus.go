package config

import (
	"github.com/sirupsen/logrus"
)

type logrusLogger struct {
	logger *logrus.Logger
}

func NewLogrusLogger(config *Config) *logrusLogger {
	logger := logrus.New()

	logger.SetLevel(logrus.Level(config.Log.Level))
	logger.SetFormatter(&logrus.JSONFormatter{})

	return &logrusLogger{
		logger: logger,
	}
}

func (l *logrusLogger) Info(message string) {
	l.logger.Info(message)
}

func (l *logrusLogger) Error(err error, message string) {
	l.logger.WithError(err).Error(message)
}

func (l *logrusLogger) Fatalf(format string, args ...interface{}) {
	l.logger.Fatalf(format, args...)
}

func (l *logrusLogger) Printf(message string, args ...interface{}) {
	// l.logger.Tracef(message, args...)
	l.logger.Printf(message, args...)
}

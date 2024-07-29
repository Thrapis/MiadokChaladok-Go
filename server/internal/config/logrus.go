package config

import (
	"github.com/sirupsen/logrus"
)

// LogrusLogger - logrus logger wrapper.
type LogrusLogger struct {
	logger *logrus.Logger
}

// NewLogrusLogger - returns configurated LogrusLogger instance.
func NewLogrusLogger(config *Config) *LogrusLogger {
	logger := logrus.New()

	logger.SetLevel(logrus.Level(config.Log.Level))
	logger.SetFormatter(&logrus.JSONFormatter{})

	return &LogrusLogger{
		logger: logger,
	}
}

// Info - writes info message.
func (l *LogrusLogger) Info(message string) {
	l.logger.Info(message)
}

// Error - writes error with error message.
func (l *LogrusLogger) Error(err error, message string) {
	l.logger.WithError(err).Error(message)
}

// Fatalf - writes formatted message and exits program.
func (l *LogrusLogger) Fatalf(format string, args ...interface{}) {
	l.logger.Fatalf(format, args...)
}

// Printf - writes formatted message.
func (l *LogrusLogger) Printf(message string, args ...interface{}) {
	// l.logger.Tracef(message, args...)
	l.logger.Printf(message, args...)
}

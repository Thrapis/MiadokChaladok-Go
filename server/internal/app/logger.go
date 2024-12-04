package app

// ILogger - represent interface for application logger.
//
//go:generate go run github.com/vektra/mockery/v2@v2.46.0 --name ILogger --output "../../test/internal/app/mocks/"
type ILogger interface {
	Info(message string)
	Error(err error, message string)
	Fatalf(format string, args ...interface{})
	Printf(format string, args ...interface{})
}

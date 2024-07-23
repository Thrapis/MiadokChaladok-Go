package app

type ILogger interface {
	Info(message string)
	Error(err error, message string)
	Fatalf(format string, args ...interface{})
	Printf(format string, args ...interface{})
}

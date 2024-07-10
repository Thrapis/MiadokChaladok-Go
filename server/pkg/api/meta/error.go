package meta

type ErrorMeta struct {
	ErrorCode    int    `json:"errorCode"`
	ErrorMessage string `json:"errorMessage"`
}

func NewErrorMeta(errorCode int, errorMessage string) *ErrorMeta {
	return &ErrorMeta{
		ErrorCode:    errorCode,
		ErrorMessage: errorMessage,
	}
}

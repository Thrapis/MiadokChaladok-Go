package meta

type FormMeta struct {
	ErrorCode int
}

func NewFormMeta(errorCode int) *FormMeta {
	return &FormMeta{
		ErrorCode: errorCode,
	}
}

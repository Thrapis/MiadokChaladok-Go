package model

type HttpResponse[T any] struct {
	Payload    T               `json:"payload,omitempty"`
	Pagination *PaginationMeta `json:"pagination,omitempty"`
	Errors     string          `json:"errors,omitempty"`
}

type PaginationMeta struct {
	Page       uint `json:"page"`
	PageSize   uint `json:"pageSize"`
	TotalPages uint `json:"totalPages"`
}

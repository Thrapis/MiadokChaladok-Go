// Package model provides dtos for client-server communication.
package model

// HTTPResponse - entity-wrapper for server responses.
type HTTPResponse[T any] struct {
	Payload    T               `json:"payload,omitempty"`
	Pagination *PaginationMeta `json:"pagination,omitempty"`
	Errors     string          `json:"errors,omitempty"`
}

// PaginationMeta - entity that represents pagination meta.
type PaginationMeta struct {
	Page       uint `json:"page"`
	PageSize   uint `json:"pageSize"`
	TotalPages uint `json:"totalPages"`
}

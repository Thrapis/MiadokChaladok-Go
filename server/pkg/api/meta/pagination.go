package meta

type PaginationMeta struct {
	Page       int `json:"page"`
	PageSize   int `json:"pageSize"`
	TotalPages int `json:"totalPages"`
}

func NewPagintionMeta(page, pageSize, totalPages int) *PaginationMeta {
	return &PaginationMeta{
		Page:       page,
		PageSize:   pageSize,
		TotalPages: totalPages,
	}
}

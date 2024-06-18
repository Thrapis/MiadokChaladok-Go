package meta

type PaginationMeta struct {
	Page       int
	PageSize   int
	TotalPages int
}

func NewPagintionMeta(page, pageSize, totalPages int) *PaginationMeta {
	return &PaginationMeta{
		Page:       page,
		PageSize:   pageSize,
		TotalPages: totalPages,
	}
}

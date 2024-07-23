package product

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
)

type IProductRepository interface {
	GetProductDescriptionById(request *model.GetProductDescriptionRequest) (*entity.Product, error)
	GetSuggestedProducts(request *model.GetSuggestionsRequest) ([]entity.Product, error)
	GetProductsByFilterPaginated(request *model.GetProductsByFilterPaginatedRequest) ([]entity.Product, int64, error)
}

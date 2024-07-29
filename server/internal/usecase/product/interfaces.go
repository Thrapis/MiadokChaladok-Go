package product

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
)

// IProductRepository - interface of product repository required for ProductUseCase.
type IProductRepository interface {
	// GetProductDescriptionByID - returns product description by ID.
	GetProductDescriptionByID(request *model.GetProductDescriptionRequest) (*entity.Product, error)
	// GetSuggestedProducts - returns products that has link with suggestion.
	GetSuggestedProducts(request *model.GetSuggestionsRequest) ([]entity.Product, error)
	// GetProductsByFilterPaginated - returns page of products and
	// count of all products that match filters.
	GetProductsByFilterPaginated(request *model.GetProductsByFilterPaginatedRequest) ([]entity.Product, int64, error)
}

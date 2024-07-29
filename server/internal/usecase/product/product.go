// Package product provides description of product usecase.
package product

import (
	"context"
	"errors"

	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"
)

var errGettingFromRepository = errors.New("getting from repository failed")

// UseCase - entity of product usecase.
type UseCase struct {
	storage           app.IStorage
	log               app.ILogger
	productRepository IProductRepository
}

// NewProductUseCase - returns product UseCase instance.
func NewProductUseCase(storage app.IStorage, logger app.ILogger,
	productRepository IProductRepository,
) *UseCase {
	return &UseCase{
		storage:           storage,
		log:               logger,
		productRepository: productRepository,
	}
}

// GetProductDescription - returns product detailed description.
func (c *UseCase) GetProductDescription(_ context.Context, request *model.GetProductDescriptionRequest) (*model.ProductDescriptionResponse, error) {
	product, err := c.productRepository.GetProductDescriptionByID(request)
	if err != nil {
		c.log.Error(err, "failed to find product")
		return nil, errGettingFromRepository
	}

	responseProduct := converter.ProductToDescriptionResponse(product)

	return responseProduct, nil
}

// GetSuggestions - returns product previews that are amoung suggested.
func (c *UseCase) GetSuggestions(_ context.Context, request *model.GetSuggestionsRequest) ([]model.ProductPreviewResponse, error) {
	products, err := c.productRepository.GetSuggestedProducts(request)
	if err != nil {
		c.log.Error(err, "failed to find suggested products")
		return nil, errGettingFromRepository
	}

	responseProducts := make([]model.ProductPreviewResponse, len(products))
	for i, v := range products {
		responseProducts[i] = *converter.ProductToPreviewResponse(&v)
	}

	return responseProducts, nil
}

// GetProductsByFilterPaginated - returns page of products and count
// of all products that match filters.
func (c *UseCase) GetProductsByFilterPaginated(_ context.Context, request *model.GetProductsByFilterPaginatedRequest) ([]model.ProductPreviewResponse, int64, error) {
	products, total, err := c.productRepository.GetProductsByFilterPaginated(request)
	if err != nil {
		c.log.Error(err, "failed to find products by filter")
		return nil, 0, errGettingFromRepository
	}

	responseProducts := make([]model.ProductPreviewResponse, len(products))
	for i, v := range products {
		responseProducts[i] = *converter.ProductToPreviewResponse(&v)
	}

	return responseProducts, total, nil
}

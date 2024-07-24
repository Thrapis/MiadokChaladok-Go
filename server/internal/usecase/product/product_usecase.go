package product

import (
	"context"
	"errors"

	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"
)

var ErrGettingFromRepository = errors.New("getting from repository failed")

type productUseCase struct {
	storage           app.IStorage
	log               app.ILogger
	productRepository IProductRepository
}

func NewProductUseCase(storage app.IStorage, logger app.ILogger,
	productRepository IProductRepository,
) *productUseCase {
	return &productUseCase{
		storage:           storage,
		log:               logger,
		productRepository: productRepository,
	}
}

func (c *productUseCase) GetProductDescription(ctx context.Context, request *model.GetProductDescriptionRequest) (*model.ProductDescriptionResponse, error) {
	product, err := c.productRepository.GetProductDescriptionById(request)
	if err != nil {
		c.log.Error(err, "failed to find product")
		return nil, ErrGettingFromRepository
	}

	responseProduct := converter.ProductToDescriptionResponse(product)

	return responseProduct, nil
}

func (c *productUseCase) GetSuggestions(ctx context.Context, request *model.GetSuggestionsRequest) ([]model.ProductPreviewResponse, error) {
	products, err := c.productRepository.GetSuggestedProducts(request)
	if err != nil {
		c.log.Error(err, "failed to find suggested products")
		return nil, ErrGettingFromRepository
	}

	responseProducts := make([]model.ProductPreviewResponse, len(products))
	for i, v := range products {
		responseProducts[i] = *converter.ProductToPreviewResponse(&v)
	}

	return responseProducts, nil
}

func (c *productUseCase) GetProductsByFilterPaginated(ctx context.Context, request *model.GetProductsByFilterPaginatedRequest) ([]model.ProductPreviewResponse, int64, error) {
	products, total, err := c.productRepository.GetProductsByFilterPaginated(request)
	if err != nil {
		c.log.Error(err, "failed to find products by filter")
		return nil, 0, ErrGettingFromRepository
	}

	responseProducts := make([]model.ProductPreviewResponse, len(products))
	for i, v := range products {
		responseProducts[i] = *converter.ProductToPreviewResponse(&v)
	}

	return responseProducts, total, nil
}

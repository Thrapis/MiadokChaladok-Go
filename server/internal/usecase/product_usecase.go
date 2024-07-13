package usecase

import (
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"
	"miadok-chaladok/internal/repository"
	"miadok-chaladok/pkg/storage"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type ProductUseCase struct {
	DB                *gorm.DB
	Storage           storage.StorageOperator
	Log               *logrus.Logger
	ProductRepository *repository.ProductRepository
}

func NewProductUseCase(db *gorm.DB, storage storage.StorageOperator,
	logger *logrus.Logger, productRepository *repository.ProductRepository) *ProductUseCase {
	return &ProductUseCase{
		DB:                db,
		Storage:           storage,
		Log:               logger,
		ProductRepository: productRepository,
	}
}

func (c *ProductUseCase) GetProductDescription(ctx *gin.Context, request *model.GetProductDescriptionRequest) (*model.ProductDescriptionResponse, error) {

	product, err := c.ProductRepository.GetProductDescriptionById(request)
	if err != nil {
		c.Log.WithError(err).Error("failed to find product")
		return nil, gin.Error{}
	}

	responseProduct := converter.ProductToDescriptionResponse(product)

	return responseProduct, nil
}

func (c *ProductUseCase) GetSuggestions(ctx *gin.Context, request *model.GetSuggestionsRequest) ([]model.ProductPreviewResponse, error) {

	products, err := c.ProductRepository.GetSuggestedProducts(request)
	if err != nil {
		c.Log.WithError(err).Error("failed to find suggested products")
		return nil, gin.Error{}
	}

	responseProducts := make([]model.ProductPreviewResponse, len(products))
	for i, v := range products {
		responseProducts[i] = *converter.ProductToPreviewResponse(&v)
	}

	return responseProducts, nil
}

func (c *ProductUseCase) GetProductsByFilterPaginated(ctx *gin.Context, request *model.GetProductsByFilterPaginatedRequest) ([]model.ProductPreviewResponse, int64, error) {

	products, total, err := c.ProductRepository.GetProductsByFilterPaginated(request)
	if err != nil {
		c.Log.WithError(err).Error("failed to find products by filter")
		return nil, 0, gin.Error{}
	}

	responseProducts := make([]model.ProductPreviewResponse, len(products))
	for i, v := range products {
		responseProducts[i] = *converter.ProductToPreviewResponse(&v)
	}

	return responseProducts, total, nil
}

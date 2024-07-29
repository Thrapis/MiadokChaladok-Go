package http

import (
	"context"
	"math"
	"net/http"
	"strconv"

	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"

	"github.com/gin-gonic/gin"
)

// IProductUseCase - interface of product usecase required for ProductController.
type IProductUseCase interface {
	// GetProductDescription - returns detailed description of the product.
	GetProductDescription(ctx context.Context, request *model.GetProductDescriptionRequest) (*model.ProductDescriptionResponse, error)
	// GetSuggestions - returns suggested product previews.
	GetSuggestions(ctx context.Context, request *model.GetSuggestionsRequest) ([]model.ProductPreviewResponse, error)
	// GetProductsByFilterPaginated - returns page of product previews and overall count of
	// products that match the filters.
	GetProductsByFilterPaginated(ctx context.Context, request *model.GetProductsByFilterPaginatedRequest) ([]model.ProductPreviewResponse, int64, error)
}

// ProductController - entity of product controller.
type ProductController struct {
	useCase IProductUseCase
	log     app.ILogger
}

// NewProductController - returns ProductController instance.
func NewProductController(useCase IProductUseCase, log app.ILogger) *ProductController {
	return &ProductController{
		useCase: useCase,
		log:     log,
	}
}

// GetProductDescriptionByID - returns detailed description of the product by ID.
func (c *ProductController) GetProductDescriptionByID(ctx *gin.Context) {
	productIDString := ctx.Query("productId")
	productID, err := strconv.ParseUint(productIDString, 0, 64)
	if err != nil {
		c.log.Error(err, "failed to parse request query")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	request := &model.GetProductDescriptionRequest{ProductID: uint(productID)}

	response, err := c.useCase.GetProductDescription(ctx, request)
	if err != nil {
		c.log.Error(err, "error getting product description")
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	ctx.JSON(http.StatusOK, model.HTTPResponse[*model.ProductDescriptionResponse]{Payload: response})
}

// GetSuggestions - returns suggested product previews.
func (c *ProductController) GetSuggestions(ctx *gin.Context) {
	maxCountString := ctx.Query("limit")
	limit, err := strconv.ParseInt(maxCountString, 0, 64)
	if err != nil {
		c.log.Error(err, "failed to parse request query")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	request := &model.GetSuggestionsRequest{Limit: int(limit)}

	response, err := c.useCase.GetSuggestions(ctx, request)
	if err != nil {
		c.log.Error(err, "error getting suggested products")
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	ctx.JSON(http.StatusOK, model.HTTPResponse[[]model.ProductPreviewResponse]{Payload: response})
}

// GetProductsByFilterPaginated - returns page of product previews and pagination meta of
// products that match the filters.
func (c *ProductController) GetProductsByFilterPaginated(ctx *gin.Context) {
	pageString := ctx.Query("page")
	page, err := strconv.ParseUint(pageString, 10, 64)
	if err != nil {
		c.log.Error(err, "failed to parse request query")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	pageSizeString := ctx.Query("pageSize")
	pageSize, err := strconv.ParseUint(pageSizeString, 10, 64)
	if err != nil {
		c.log.Error(err, "failed to parse request query")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	request := &model.GetProductsByFilterPaginatedRequest{
		PriceFrom:  -1,
		PriceTo:    math.MaxFloat32,
		VolumeFrom: -1,
		VolumeTo:   math.MaxFloat32,
		Page:       uint(page),
		PageSize:   uint(pageSize),
		SortType:   model.SortByPopular,
	}
	if err := ctx.BindJSON(request); err != nil {
		c.log.Error(err, "failed to parse request body")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	response, total, err := c.useCase.GetProductsByFilterPaginated(ctx, request)
	if err != nil {
		c.log.Error(err, "error getting products by filter")
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	pagination := &model.PaginationMeta{
		Page:       request.Page,
		PageSize:   request.PageSize,
		TotalPages: uint(math.Ceil(float64(total) / float64(request.PageSize))),
	}

	ctx.JSON(http.StatusOK, model.HTTPResponse[[]model.ProductPreviewResponse]{
		Payload:    response,
		Pagination: pagination,
	})
}

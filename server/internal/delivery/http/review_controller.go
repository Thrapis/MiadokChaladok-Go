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

// IReviewUseCase - interface of review usecase required for ReviewController.
type IReviewUseCase interface {
	// Create - creates review.
	Create(ctx context.Context, request *model.CreateReviewRequest) error
	// GetByProductIDPaginated - returns page and overall count of
	// reviews that belong to product with ID.
	GetByProductIDPaginated(ctx context.Context, request *model.GetReviewsByProductIdRequest) ([]model.ReviewDescriptionResponse, int64, error)
}

// ReviewController - entity of review controller.
type ReviewController struct {
	useCase IReviewUseCase
	log     app.ILogger
}

// NewReviewController - returns ReviewController instance.
func NewReviewController(useCase IReviewUseCase, log app.ILogger) *ReviewController {
	return &ReviewController{
		useCase: useCase,
		log:     log,
	}
}

// const (
// 	noError                   = iota
// 	invalidPayNumberOrBuyDate = iota
// )

// AddReviewToProduct - adds review to product.
func (c *ReviewController) AddReviewToProduct(ctx *gin.Context) {
	request := &model.CreateReviewRequest{}
	if err := ctx.BindJSON(request); err != nil {
		c.log.Error(err, "failed to parse request body")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	err := c.useCase.Create(ctx, request)
	if err != nil {
		c.log.Error(err, "failed to create review")
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	ctx.Status(http.StatusOK)
}

// GetReviewsByProductIDPaginated - returns page and pagination meta of
// reviews that belong to product with ID.
func (c *ReviewController) GetReviewsByProductIDPaginated(ctx *gin.Context) {
	productIDString := ctx.Query("productId")
	productID, err := strconv.ParseUint(productIDString, 10, 64)
	if err != nil {
		c.log.Error(err, "failed to parse request query")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	pageString := ctx.Query("page")
	page, _ := strconv.ParseUint(pageString, 10, 64)
	if err != nil {
		c.log.Error(err, "failed to parse request query")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	pageSizeString := ctx.Query("pageSize")
	pageSize, _ := strconv.ParseUint(pageSizeString, 10, 64)
	if err != nil {
		c.log.Error(err, "failed to parse request query")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	request := &model.GetReviewsByProductIdRequest{
		ProductID: uint(productID),
		Page:      uint(page),
		PageSize:  uint(pageSize),
	}

	response, total, err := c.useCase.GetByProductIDPaginated(ctx, request)
	if err != nil {
		c.log.Error(err, "failed getting reviews")
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	pagination := &model.PaginationMeta{
		Page:       request.Page,
		PageSize:   request.PageSize,
		TotalPages: uint(math.Ceil(float64(total) / float64(request.PageSize))),
	}

	ctx.JSON(http.StatusOK, model.HTTPResponse[[]model.ReviewDescriptionResponse]{
		Payload:    response,
		Pagination: pagination,
	})
}

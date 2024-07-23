package http

import (
	"context"
	"math"
	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type IReviewUseCase interface {
	Create(ctx context.Context, request *model.CreateReviewRequest) error
	GetByProductId(ctx context.Context, request *model.GetReviewsByProductIdRequest) ([]model.ReviewDescriptionResponse, int64, error)
}

type reviewController struct {
	useCase IReviewUseCase
	log     app.ILogger
}

func NewReviewController(useCase IReviewUseCase, log app.ILogger) *reviewController {
	return &reviewController{
		useCase: useCase,
		log:     log,
	}
}

const (
	NO_ERROR                       = iota
	INVALID_PAY_NUMBER_OR_BUY_DATE = iota
)

func (c *reviewController) AddReviewToProduct(ctx *gin.Context) {

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

func (c *reviewController) GetReviewsByProductIdPaginated(ctx *gin.Context) {

	productIdString := ctx.Query("productId")
	productId, err := strconv.ParseUint(productIdString, 10, 64)
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
		ProductID: uint(productId),
		Page:      uint(page),
		PageSize:  uint(pageSize),
	}

	response, total, err := c.useCase.GetByProductId(ctx, request)
	if err != nil {
		c.log.Error(err, "failed getting reviews")
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	pagination := &model.PaginationMeta{
		Page:       request.Page,
		PageSize:   request.PageSize,
		TotalPages: uint(math.Ceil(float64(total) / float64(request.PageSize))),
	}

	ctx.JSON(http.StatusOK, model.HttpResponse[[]model.ReviewDescriptionResponse]{
		Payload:    response,
		Pagination: pagination,
	})
}

package http

import (
	"math"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type ReviewController struct {
	UseCase *usecase.ReviewUseCase
	Log     *logrus.Logger
}

func NewReviewController(useCase *usecase.ReviewUseCase, log *logrus.Logger) *ReviewController {
	return &ReviewController{
		UseCase: useCase,
		Log:     log,
	}
}

const (
	NO_ERROR                       = iota
	INVALID_PAY_NUMBER_OR_BUY_DATE = iota
)

func (c *ReviewController) AddReviewToProduct(ctx *gin.Context) {

	request := &model.CreateReviewRequest{}
	if err := ctx.BindJSON(request); err != nil {
		c.Log.WithError(err).Error("failed to parse request body")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	err := c.UseCase.Create(ctx, request)
	if err != nil {
		c.Log.WithError(err).Error("failed to create review")
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	ctx.Status(http.StatusOK)
}

func (c *ReviewController) GetReviewsByProductIdPaginated(ctx *gin.Context) {

	productIdString := ctx.Query("productId")
	productId, err := strconv.ParseUint(productIdString, 10, 64)
	if err != nil {
		c.Log.WithError(err).Error("failed to parse request query")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	pageString := ctx.Query("page")
	page, _ := strconv.ParseUint(pageString, 10, 64)
	if err != nil {
		c.Log.WithError(err).Error("failed to parse request query")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	pageSizeString := ctx.Query("pageSize")
	pageSize, _ := strconv.ParseUint(pageSizeString, 10, 64)
	if err != nil {
		c.Log.WithError(err).Error("failed to parse request query")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	request := &model.GetReviewsByProductIdRequest{
		ProductID: uint(productId),
		Page:      uint(page),
		PageSize:  uint(pageSize),
	}

	response, total, err := c.UseCase.GetByProductId(ctx, request)
	if err != nil {
		c.Log.WithError(err).Error("failed getting reviews")
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

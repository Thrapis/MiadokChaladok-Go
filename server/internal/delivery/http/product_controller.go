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

type ProductController struct {
	UseCase *usecase.ProductUseCase
	Log     *logrus.Logger
}

func NewProductController(useCase *usecase.ProductUseCase, log *logrus.Logger) *ProductController {
	return &ProductController{
		UseCase: useCase,
		Log:     log,
	}
}

func (c *ProductController) GetProductDescriptionById(ctx *gin.Context) {

	productIdString := ctx.Query("productId")
	productId, err := strconv.ParseUint(productIdString, 0, 64)
	if err != nil {
		c.Log.WithError(err).Error("failed to parse request query")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	request := &model.GetProductDescriptionRequest{ProductID: uint(productId)}

	response, err := c.UseCase.GetProductDescription(ctx, request)
	if err != nil {
		c.Log.WithError(err).Error("error getting product description")
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	ctx.JSON(http.StatusOK, model.HttpResponse[*model.ProductDescriptionResponse]{Payload: response})
}

func (c *ProductController) GetSuggestions(ctx *gin.Context) {

	maxCountString := ctx.Query("limit")
	limit, err := strconv.ParseInt(maxCountString, 0, 64)
	if err != nil {
		c.Log.WithError(err).Error("failed to parse request query")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	request := &model.GetSuggestionsRequest{Limit: int(limit)}

	response, err := c.UseCase.GetSuggestions(ctx, request)
	if err != nil {
		c.Log.WithError(err).Error("error getting suggested products")
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	ctx.JSON(http.StatusOK, model.HttpResponse[[]model.ProductPreviewResponse]{Payload: response})
}

func (c *ProductController) GetProductsByFilterPaginated(ctx *gin.Context) {

	pageString := ctx.Query("page")
	page, err := strconv.ParseUint(pageString, 10, 64)
	if err != nil {
		c.Log.WithError(err).Error("failed to parse request query")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	pageSizeString := ctx.Query("pageSize")
	pageSize, err := strconv.ParseUint(pageSizeString, 10, 64)
	if err != nil {
		c.Log.WithError(err).Error("failed to parse request query")
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
		c.Log.WithError(err).Error("failed to parse request body")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	response, total, err := c.UseCase.GetProductsByFilterPaginated(ctx, request)
	if err != nil {
		c.Log.WithError(err).Error("error getting products by filter")
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	pagination := &model.PaginationMeta{
		Page:       request.Page,
		PageSize:   request.PageSize,
		TotalPages: uint(math.Ceil(float64(total) / float64(request.PageSize))),
	}

	ctx.JSON(http.StatusOK, model.HttpResponse[[]model.ProductPreviewResponse]{
		Payload:    response,
		Pagination: pagination,
	})
}

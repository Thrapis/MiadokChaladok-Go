package http

import (
	"context"
	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

type IOptionUseCase interface {
	GetCartItems(ctx context.Context, request *model.GetCartItemsRequest) ([]model.OptionItemResponse, error)
}

type optionController struct {
	useCase IOptionUseCase
	log     app.ILogger
}

func NewOptionController(useCase IOptionUseCase, log app.ILogger) *optionController {
	return &optionController{
		useCase: useCase,
		log:     log,
	}
}

func (c *optionController) GetCartItems(ctx *gin.Context) {

	request := new(model.GetCartItemsRequest)
	if err := ctx.BindJSON(&request); err != nil {
		c.log.Error(err, "error parsing request body")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	response, err := c.useCase.GetCartItems(ctx, request)
	if err != nil {
		c.log.Error(err, "error getting cart items")
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	ctx.JSON(http.StatusOK, model.HttpResponse[[]model.OptionItemResponse]{Payload: response})
}

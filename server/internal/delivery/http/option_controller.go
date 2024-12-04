package http

import (
	"context"
	"net/http"

	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"

	"github.com/gin-gonic/gin"
)

// IOptionUseCase - interface of option usecase required for OptionController.
//
//go:generate go run github.com/vektra/mockery/v2@v2.46.0 --name IOptionUseCase --output "../../../test/internal/delivery/http/mocks/"
type IOptionUseCase interface {
	// GetCartItems - returns cart items.
	GetCartItems(ctx context.Context, request *model.GetCartItemsRequest) ([]model.OptionItemResponse, error)
}

// OptionController - entity of option controller.
type OptionController struct {
	useCase IOptionUseCase
	log     app.ILogger
}

// NewOptionController - returns OptionController instance.
func NewOptionController(useCase IOptionUseCase, log app.ILogger) *OptionController {
	return &OptionController{
		useCase: useCase,
		log:     log,
	}
}

// GetCartItems - returns cart items.
func (c *OptionController) GetCartItems(ctx *gin.Context) {
	request := new(model.GetCartItemsRequest)
	if err := ctx.BindJSON(&request); err != nil {
		c.log.Error(err, "error parsing request body")
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}

	response, err := c.useCase.GetCartItems(ctx, request)
	if err != nil {
		c.log.Error(err, "error getting cart items")
		ctx.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	ctx.JSON(http.StatusOK, model.HTTPResponse[[]model.OptionItemResponse]{Payload: response})
}

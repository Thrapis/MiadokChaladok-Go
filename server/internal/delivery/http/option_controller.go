package http

import (
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type OptionController struct {
	UseCase *usecase.OptionUseCase
	Log     *logrus.Logger
}

func NewOptionController(useCase *usecase.OptionUseCase, log *logrus.Logger) *OptionController {
	return &OptionController{
		UseCase: useCase,
		Log:     log,
	}
}

func (c *OptionController) GetCartItems(ctx *gin.Context) {

	request := new(model.GetCartItemsRequest)
	if err := ctx.BindJSON(&request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	response, err := c.UseCase.GetCartItems(ctx, request)
	if err != nil {
		c.Log.WithError(err).Error("error getting cart items")
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	ctx.JSON(http.StatusOK, model.HttpResponse[[]model.OptionItemResponse]{Payload: response})
}

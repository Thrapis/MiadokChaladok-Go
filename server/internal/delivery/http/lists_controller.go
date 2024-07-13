package http

import (
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type ListsController struct {
	UseCase *usecase.ListsUseCase
	Log     *logrus.Logger
}

func NewListsController(useCase *usecase.ListsUseCase, log *logrus.Logger) *ListsController {
	return &ListsController{
		UseCase: useCase,
		Log:     log,
	}
}

func (c *ListsController) GetFilterLists(ctx *gin.Context) {

	response, err := c.UseCase.Get(ctx)
	if err != nil {
		c.Log.WithError(err).Error("error getting filter lists")
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	ctx.JSON(http.StatusOK, model.HttpResponse[*model.FilterListsResponse]{Payload: response})
}

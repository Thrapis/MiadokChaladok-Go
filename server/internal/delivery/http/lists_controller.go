package http

import (
	"context"
	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

type IListsUseCase interface {
	Get(ctx context.Context) (*model.FilterListsResponse, error)
}

type listsController struct {
	useCase IListsUseCase
	log     app.ILogger
}

func NewListsController(useCase IListsUseCase, log app.ILogger) *listsController {
	return &listsController{
		useCase: useCase,
		log:     log,
	}
}

func (c *listsController) GetFilterLists(ctx *gin.Context) {

	response, err := c.useCase.Get(ctx)
	if err != nil {
		c.log.Error(err, "error getting filter lists")
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	ctx.JSON(http.StatusOK, model.HttpResponse[*model.FilterListsResponse]{Payload: response})
}

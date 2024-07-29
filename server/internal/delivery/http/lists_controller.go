package http

import (
	"context"
	"net/http"

	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"

	"github.com/gin-gonic/gin"
)

// IListsUseCase - interface of lists usecase required for ListsController.
type IListsUseCase interface {
	// GetFilterLists - returns filter lists.
	GetFilterLists(ctx context.Context) (*model.FilterListsResponse, error)
}

// ListsController - entity of lists controller.
type ListsController struct {
	useCase IListsUseCase
	log     app.ILogger
}

// NewListsController - returns ListsController instance.
func NewListsController(useCase IListsUseCase, log app.ILogger) *ListsController {
	return &ListsController{
		useCase: useCase,
		log:     log,
	}
}

// GetFilterLists - returns lists required for filter.
func (c *ListsController) GetFilterLists(ctx *gin.Context) {
	response, err := c.useCase.GetFilterLists(ctx)
	if err != nil {
		c.log.Error(err, "error getting filter lists")
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	ctx.JSON(http.StatusOK, model.HTTPResponse[*model.FilterListsResponse]{Payload: response})
}

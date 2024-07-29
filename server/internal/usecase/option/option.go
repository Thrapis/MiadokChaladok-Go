// Package option provides description of option usecase.
package option

import (
	"context"
	"errors"

	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"
)

var errGettingFromRepository = errors.New("getting from repository failed")

// UseCase - entity of option usecase.
type UseCase struct {
	storage          app.IStorage
	log              app.ILogger
	optionRepository IOptionRepository
}

// NewOptionUseCase - returns option UseCase instance.
func NewOptionUseCase(storage app.IStorage, logger app.ILogger,
	optionRepository IOptionRepository,
) *UseCase {
	return &UseCase{
		storage:          storage,
		log:              logger,
		optionRepository: optionRepository,
	}
}

// GetCartItems - returns cart items.
func (c *UseCase) GetCartItems(_ context.Context, request *model.GetCartItemsRequest) ([]model.OptionItemResponse, error) {
	items, err := c.optionRepository.GetCartItemOptions(request)
	if err != nil {
		c.log.Error(err, "failed to find options")
		return nil, errGettingFromRepository
	}

	responseItems := make([]model.OptionItemResponse, len(items))
	for i, item := range items {
		responseItems[i] = *converter.OptionToItemResponse(&item)
	}

	return responseItems, nil
}

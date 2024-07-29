package option

import (
	"context"
	"errors"

	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"
)

var ErrGettingFromRepository = errors.New("getting from repository failed")

type optionUseCase struct {
	storage          app.IStorage
	log              app.ILogger
	optionRepository IOptionRepository
}

func NewOptionUseCase(storage app.IStorage, logger app.ILogger,
	optionRepository IOptionRepository,
) *optionUseCase {
	return &optionUseCase{
		storage:          storage,
		log:              logger,
		optionRepository: optionRepository,
	}
}

func (c *optionUseCase) GetCartItems(ctx context.Context, request *model.GetCartItemsRequest) ([]model.OptionItemResponse, error) {
	items, err := c.optionRepository.GetCartItemOptions(request)
	if err != nil {
		c.log.Error(err, "failed to find options")
		return nil, ErrGettingFromRepository
	}

	responseItems := make([]model.OptionItemResponse, len(items))
	for i, item := range items {
		responseItems[i] = *converter.OptionToItemResponse(&item)
	}

	return responseItems, nil
}

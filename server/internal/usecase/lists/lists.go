// Package lists provides description of lists usecase.
package lists

import (
	"context"
	"errors"
	"time"

	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"
)

var errGettingFromRepository = errors.New("getting from repository failed")

// UseCase - entity of lists usecase.
type UseCase struct {
	storage                  app.IStorage
	log                      app.ILogger
	categoryRepository       ICategoryRepository
	tasteRepository          ITasteRepository
	shipmentMethodRepository IShipmentMethodRepository
}

// NewListsUseCase - returns lists UseCase instance.
func NewListsUseCase(storage app.IStorage, logger app.ILogger,
	categoryRepository ICategoryRepository, tasteRepository ITasteRepository,
	shipmentMethodRepository IShipmentMethodRepository,
) *UseCase {
	return &UseCase{
		storage:                  storage,
		log:                      logger,
		categoryRepository:       categoryRepository,
		tasteRepository:          tasteRepository,
		shipmentMethodRepository: shipmentMethodRepository,
	}
}

const (
	filterListsStorageKey      = "FilterListsCached"
	filterListsStorageDuration = time.Hour * 6
)

// GetFilterLists - returns filter lists.
func (c *UseCase) GetFilterLists(ctx context.Context) (*model.FilterListsResponse, error) {
	var lists *model.FilterListsResponse

	err := c.storage.GetStruct(ctx, filterListsStorageKey, lists)
	if err == nil {
		return lists, nil
	}

	categories, err := c.categoryRepository.GetAll()
	if err != nil {
		c.log.Error(err, "failed to get categories")
		return nil, errGettingFromRepository
	}

	tastes, err := c.tasteRepository.GetAll()
	if err != nil {
		c.log.Error(err, "failed to get tastes")
		return nil, errGettingFromRepository
	}

	shipmentMethods, err := c.shipmentMethodRepository.GetAll()
	if err != nil {
		c.log.Error(err, "failed to get shipment methods")
		return nil, errGettingFromRepository
	}

	responseCategories := make([]model.FilterRecordResponse, len(categories))
	for i, category := range categories {
		responseCategories[i] = *converter.CategoryToFilterResponse(&category)
	}

	responseTastes := make([]model.FilterRecordResponse, len(tastes))
	for i, taste := range tastes {
		responseTastes[i] = *converter.TasteToFilterResponse(&taste)
	}

	responseShipmentMethods := make([]model.FilterRecordResponse, len(shipmentMethods))
	for i, shipmentMethod := range shipmentMethods {
		responseShipmentMethods[i] = *converter.ShipmentMethodToFilterResponse(&shipmentMethod)
	}

	lists = &model.FilterListsResponse{
		Categories:      responseCategories,
		Tastes:          responseTastes,
		ShipmentMethods: responseShipmentMethods,
	}

	err = c.storage.SetStruct(ctx, filterListsStorageKey, lists, filterListsStorageDuration)
	if err != nil {
		c.log.Error(err, "failed to cache filter lists")
	}

	return lists, nil
}

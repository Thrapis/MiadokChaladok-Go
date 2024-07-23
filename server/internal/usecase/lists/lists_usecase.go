package lists

import (
	"context"
	"errors"
	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"
	"time"
)

var (
	ErrGettingFromRepository = errors.New("getting from repository failed")
)

type listsUseCase struct {
	storage                  app.IStorage
	log                      app.ILogger
	categoryRepository       ICategoryRepository
	tasteRepository          ITasteRepository
	shipmentMethodRepository IShipmentMethodRepository
}

func NewListsUseCase(storage app.IStorage, logger app.ILogger,
	categoryRepository ICategoryRepository, tasteRepository ITasteRepository,
	shipmentMethodRepository IShipmentMethodRepository) *listsUseCase {
	return &listsUseCase{
		storage:                  storage,
		log:                      logger,
		categoryRepository:       categoryRepository,
		tasteRepository:          tasteRepository,
		shipmentMethodRepository: shipmentMethodRepository,
	}
}

const filterListsStorageKey = "FilterListsCached"
const filterListsStorageDuration = time.Hour * 6

func (c *listsUseCase) Get(ctx context.Context) (*model.FilterListsResponse, error) {
	var lists *model.FilterListsResponse

	err := c.storage.GetStruct(ctx, filterListsStorageKey, lists)
	if err == nil {
		return lists, nil
	}

	categories, err := c.categoryRepository.GetAll()
	if err != nil {
		c.log.Error(err, "failed to get categories")
		return nil, ErrGettingFromRepository
	}

	tastes, err := c.tasteRepository.GetAll()
	if err != nil {
		c.log.Error(err, "failed to get tastes")
		return nil, ErrGettingFromRepository
	}

	shipmentMethods, err := c.shipmentMethodRepository.GetAll()
	if err != nil {
		c.log.Error(err, "failed to get shipment methods")
		return nil, ErrGettingFromRepository
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

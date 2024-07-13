package usecase

import (
	"context"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"
	"miadok-chaladok/internal/repository"
	"miadok-chaladok/pkg/storage"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type ListsUseCase struct {
	DB                       *gorm.DB
	Storage                  storage.StorageOperator
	Log                      *logrus.Logger
	CategoryRepository       *repository.CategoryRepository
	TasteRepository          *repository.TasteRepository
	ShipmentMethodRepository *repository.ShipmentMethodRepository
}

func NewListsUseCase(db *gorm.DB, storage storage.StorageOperator,
	logger *logrus.Logger, categoryRepository *repository.CategoryRepository,
	tasteRepository *repository.TasteRepository, shipmentMethodRepository *repository.ShipmentMethodRepository) *ListsUseCase {
	return &ListsUseCase{
		DB:                       db,
		Storage:                  storage,
		Log:                      logger,
		CategoryRepository:       categoryRepository,
		TasteRepository:          tasteRepository,
		ShipmentMethodRepository: shipmentMethodRepository,
	}
}

const filterListsStorageKey = "FilterListsCached"
const filterListsStorageDuration = time.Hour * 6

func (c *ListsUseCase) Get(ctx context.Context) (*model.FilterListsResponse, error) {
	var lists *model.FilterListsResponse

	err := c.Storage.GetStruct(ctx, filterListsStorageKey, lists)
	if err == nil {
		return lists, nil
	}

	categories, err := c.CategoryRepository.GetAll()
	if err != nil {
		c.Log.WithError(err).Error("failed to get categories")
		return nil, gin.Error{}
	}

	tastes, err := c.TasteRepository.GetAll()
	if err != nil {
		c.Log.WithError(err).Error("failed to get tastes")
		return nil, gin.Error{}
	}

	shipmentMethods, err := c.ShipmentMethodRepository.GetAll()
	if err != nil {
		c.Log.WithError(err).Error("failed to get shipment methods")
		return nil, gin.Error{}
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

	err = c.Storage.SetStruct(ctx, filterListsStorageKey, lists, filterListsStorageDuration)
	if err != nil {
		c.Log.WithError(err).Error("failed to cache filter lists")
	}

	return lists, nil
}

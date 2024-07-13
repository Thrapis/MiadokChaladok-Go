package usecase

import (
	"context"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"
	"miadok-chaladok/internal/repository"
	"miadok-chaladok/pkg/storage"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type OptionUseCase struct {
	DB               *gorm.DB
	Storage          storage.StorageOperator
	Log              *logrus.Logger
	OptionRepository *repository.OptionRepository
}

func NewOptionUseCase(db *gorm.DB, storage storage.StorageOperator,
	logger *logrus.Logger, optionRepository *repository.OptionRepository) *OptionUseCase {
	return &OptionUseCase{
		DB:               db,
		Storage:          storage,
		Log:              logger,
		OptionRepository: optionRepository,
	}
}

func (c *OptionUseCase) GetCartItems(ctx context.Context, request *model.GetCartItemsRequest) ([]model.OptionItemResponse, error) {

	items, err := c.OptionRepository.GetCartItemOptions(request)
	if err != nil {
		c.Log.WithError(err).Error("failed to find options")
		return nil, gin.Error{}
	}

	responseItems := make([]model.OptionItemResponse, len(items))
	for i, item := range items {
		responseItems[i] = *converter.OptionToItemResponse(&item)
	}

	return responseItems, nil
}

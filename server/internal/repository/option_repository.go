package repository

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"

	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type OptionRepository struct {
	Repository[entity.Option]
	Log *logrus.Logger
}

func NewOptionRepository(db *gorm.DB, log *logrus.Logger) *OptionRepository {
	return &OptionRepository{
		Repository: Repository[entity.Option]{
			DB: db,
		},
		Log: log,
	}
}

func (r *OptionRepository) GetCartItemOptions(request *model.GetCartItemsRequest) ([]entity.Option, error) {
	var cartItems []entity.Option

	result := r.DB.Table("options as o").
		Joins("INNER JOIN products as p ON p.id = o.product_id").
		Where("o.id IN ?", request.OptionIds).
		Preload("ShopsOptions").Preload("Product").
		Preload("Product.Category").Preload("Product.Taste").
		Preload("Product.ShipmentMethods").
		Find(&cartItems)
	if result.Error != nil {
		return nil, result.Error
	}

	return cartItems, nil
}

package repository

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"

	"gorm.io/gorm"
)

type optionRepository struct {
	repository[entity.Option]
}

func NewOptionRepository(db *gorm.DB) *optionRepository {
	return &optionRepository{
		repository: repository[entity.Option]{
			db: db,
		},
	}
}

func (r *optionRepository) GetCartItemOptions(request *model.GetCartItemsRequest) ([]entity.Option, error) {
	var cartItems []entity.Option

	result := r.db.Table("options as o").
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

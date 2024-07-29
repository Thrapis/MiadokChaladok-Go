package repository

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"

	"gorm.io/gorm"
)

// OptionRepository - entity of option repository.
type OptionRepository struct {
	repository[entity.Option]
}

// NewOptionRepository - returns OptionRepository instance.
func NewOptionRepository(db *gorm.DB) *OptionRepository {
	return &OptionRepository{
		repository: repository[entity.Option]{
			db: db,
		},
	}
}

// GetCartItemOptions - returns options by IDs.
func (r *OptionRepository) GetCartItemOptions(request *model.GetCartItemsRequest) ([]entity.Option, error) {
	var cartItems []entity.Option

	result := r.db.Table("options as o").
		Joins("INNER JOIN products as p ON p.id = o.product_id").
		Where("o.id IN ?", request.OptionIDs).
		Preload("ShopsOptions").Preload("Product").
		Preload("Product.Category").Preload("Product.Taste").
		Preload("Product.ShipmentMethods").
		Find(&cartItems)
	if result.Error != nil {
		return nil, result.Error
	}

	return cartItems, nil
}

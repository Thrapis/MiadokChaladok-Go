package cart

import (
	"miadok-chaladok/internal/entity/data"

	"gorm.io/gorm"
)

func GetCartProductOptions(db *gorm.DB, optionIds []uint) ([]data.Option, error) {

	var cartItems []data.Option

	result := db.Table("options as o").
		Joins("INNER JOIN products as p ON p.id = o.product_id").
		Where("o.id IN ?", optionIds).
		Preload("ShopsOptions").Preload("Product").
		Preload("Product.Category").Preload("Product.Taste").
		Preload("Product.ShipmentMethods").
		Find(&cartItems)

	if result.Error != nil {
		return nil, result.Error
	}
	return cartItems, nil
}

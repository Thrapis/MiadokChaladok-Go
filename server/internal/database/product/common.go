package product

import (
	"miadok-chaladok/internal/entity/data"

	"gorm.io/gorm"
)

func GetProductById(db *gorm.DB, id uint) (*data.Product, error) {
	var product *data.Product
	result := db.Table("products").Where("id = ?", id).
		Preload("Category").Preload("Taste").
		Preload("Options").Preload("ShipmentMethods").
		Preload("Media").
		Preload("Options.ShopsOptions").
		Take(&product)

	if result.Error != nil {
		return nil, result.Error
	}
	return product, nil
}

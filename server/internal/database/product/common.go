package product

import (
	"miadok-chaladok/internal/entity/data"
	"miadok-chaladok/internal/entity/viewmodel"

	"gorm.io/gorm"
)

func GetProductDtoById(db *gorm.DB, id uint) (*viewmodel.ProductDto, error) {
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
	return viewmodel.ToProductDto(product), nil
}

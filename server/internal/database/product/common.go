package product

import (
	"miadok-chaladok/internal/entity/data"
	"miadok-chaladok/internal/entity/viewmodel"

	"gorm.io/gorm"
)

func GetProductDtoById(db *gorm.DB, id uint) (*viewmodel.ProductDto, error) {
	var product data.Product
	result := db.Preload("Options").First(product, "id = ?", id)

	if result.Error != nil {
		return nil, result.Error
	}
	return viewmodel.ToProductDto(&product), nil
}

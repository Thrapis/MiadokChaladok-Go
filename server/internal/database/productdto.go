package database

import (
	"miadok-chaladok/internal/entity/data"
	"miadok-chaladok/internal/entity/viewmodel"

	"gorm.io/gorm"
)

func GetProductDtoById(db *gorm.DB, id uint) (*viewmodel.ProductDto, error) {
	var product data.Product
	result := db.Preload("Options").First(product, "ID = ?", id)

	if result.Error != nil {
		return nil, result.Error
	}
	return viewmodel.ToProductDto(&product), nil
}

func GetProductDtosByFilter(db *gorm.DB, limit int) ([]*viewmodel.ProductDto, error) {
	if limit == 0 {
		limit = 3
	}

	var products []*data.Product
	result := db.Preload("Options").Limit(limit).Find(&products)

	if result.Error != nil {
		return nil, result.Error
	}
	return viewmodel.ToProductDtos(products), nil
}

func GetSuggestedProductDtos(db *gorm.DB, limit int) ([]*viewmodel.ProductDto, error) {
	if limit == 0 {
		limit = 3
	}

	var products []*data.Product
	result := db.Joins("left join \"Suggestions\" s on s.\"ProductID\" = \"Products\".\"ID\"").
		Preload("Options").Limit(limit).Find(&products)

	if result.Error != nil {
		return nil, result.Error
	}
	return viewmodel.ToProductDtos(products), nil
}

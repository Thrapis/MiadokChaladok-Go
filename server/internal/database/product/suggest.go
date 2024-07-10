package product

import (
	"miadok-chaladok/internal/entity/data"

	"gorm.io/gorm"
)

func GetSuggestedProducts(db *gorm.DB, limit int) ([]*data.Product, error) {
	if limit == 0 {
		limit = 3
	}

	var products []*data.Product
	result := db.Select("p.*").Table("products as p").
		Joins("INNER JOIN suggestions s ON s.product_id = p.id").
		Limit(limit).
		Preload("Options").Find(&products)

	if result.Error != nil {
		return nil, result.Error
	}
	return products, nil
}

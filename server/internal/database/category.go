package database

import (
	"miadok-chaladok/internal/entity/data"

	"gorm.io/gorm"
)

func GetAllCategories(db *gorm.DB) ([]*data.Category, error) {
	var categories []*data.Category
	result := db.Limit(-1).Find(&categories)

	if result.Error != nil {
		return nil, result.Error
	}
	return categories, nil
}

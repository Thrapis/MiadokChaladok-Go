package static

import (
	"miadok-chaladok/internal/entity/data"

	"gorm.io/gorm"
)

func GetAllTastes(db *gorm.DB) ([]data.Taste, error) {
	var tastes []data.Taste
	result := db.Limit(-1).Find(&tastes)

	if result.Error != nil {
		return nil, result.Error
	}
	return tastes, nil
}

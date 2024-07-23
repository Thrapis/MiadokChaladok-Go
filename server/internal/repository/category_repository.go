package repository

import (
	"miadok-chaladok/internal/entity"

	"gorm.io/gorm"
)

type categoryRepository struct {
	repository[entity.Category]
}

func NewCategoryRepository(db *gorm.DB) *categoryRepository {
	return &categoryRepository{
		repository: repository[entity.Category]{
			db: db,
		},
	}
}

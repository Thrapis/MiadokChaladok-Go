package repository

import (
	"miadok-chaladok/internal/entity"

	"gorm.io/gorm"
)

// CategoryRepository - entity of category repository.
type CategoryRepository struct {
	repository[entity.Category]
}

// NewCategoryRepository - returns CategoryRepository instance.
func NewCategoryRepository(db *gorm.DB) *CategoryRepository {
	return &CategoryRepository{
		repository: repository[entity.Category]{
			db: db,
		},
	}
}

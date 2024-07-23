package repository

import (
	"miadok-chaladok/internal/entity"

	"gorm.io/gorm"
)

type tasteRepository struct {
	repository[entity.Taste]
}

func NewTasteRepository(db *gorm.DB) *tasteRepository {
	return &tasteRepository{
		repository: repository[entity.Taste]{
			db: db,
		},
	}
}

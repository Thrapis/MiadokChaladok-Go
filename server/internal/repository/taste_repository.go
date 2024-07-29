package repository

import (
	"miadok-chaladok/internal/entity"

	"gorm.io/gorm"
)

// TasteRepository - entity of taste repository.
type TasteRepository struct {
	repository[entity.Taste]
}

// NewTasteRepository - returns TasteRepository instance.
func NewTasteRepository(db *gorm.DB) *TasteRepository {
	return &TasteRepository{
		repository: repository[entity.Taste]{
			db: db,
		},
	}
}

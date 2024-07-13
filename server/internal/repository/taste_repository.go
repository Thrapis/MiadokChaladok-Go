package repository

import (
	"miadok-chaladok/internal/entity"

	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type TasteRepository struct {
	Repository[entity.Taste]
	Log *logrus.Logger
}

func NewTasteRepository(db *gorm.DB, log *logrus.Logger) *TasteRepository {
	return &TasteRepository{
		Repository: Repository[entity.Taste]{
			DB: db,
		},
		Log: log,
	}
}

package repository

import (
	"miadok-chaladok/internal/entity"

	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type CategoryRepository struct {
	Repository[entity.Category]
	Log *logrus.Logger
}

func NewCategoryRepository(db *gorm.DB, log *logrus.Logger) *CategoryRepository {
	return &CategoryRepository{
		Repository: Repository[entity.Category]{
			DB: db,
		},
		Log: log,
	}
}

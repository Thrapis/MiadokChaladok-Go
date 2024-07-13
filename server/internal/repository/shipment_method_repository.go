package repository

import (
	"miadok-chaladok/internal/entity"

	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type ShipmentMethodRepository struct {
	Repository[entity.ShipmentMethod]
	Log *logrus.Logger
}

func NewShipmentMethodRepository(db *gorm.DB, log *logrus.Logger) *ShipmentMethodRepository {
	return &ShipmentMethodRepository{
		Repository: Repository[entity.ShipmentMethod]{
			DB: db,
		},
		Log: log,
	}
}

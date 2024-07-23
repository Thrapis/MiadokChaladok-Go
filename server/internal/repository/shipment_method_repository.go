package repository

import (
	"miadok-chaladok/internal/entity"

	"gorm.io/gorm"
)

type shipmentMethodRepository struct {
	repository[entity.ShipmentMethod]
}

func NewShipmentMethodRepository(db *gorm.DB) *shipmentMethodRepository {
	return &shipmentMethodRepository{
		repository: repository[entity.ShipmentMethod]{
			db: db,
		},
	}
}

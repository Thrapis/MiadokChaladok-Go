package repository

import (
	"miadok-chaladok/internal/entity"

	"gorm.io/gorm"
)

// ShipmentMethodRepository - entity of shipment method repository.
type ShipmentMethodRepository struct {
	repository[entity.ShipmentMethod]
}

// NewShipmentMethodRepository - returns ShipmentMethodRepository instance.
func NewShipmentMethodRepository(db *gorm.DB) *ShipmentMethodRepository {
	return &ShipmentMethodRepository{
		repository: repository[entity.ShipmentMethod]{
			db: db,
		},
	}
}

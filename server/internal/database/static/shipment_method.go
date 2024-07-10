package static

import (
	"miadok-chaladok/internal/entity/data"

	"gorm.io/gorm"
)

func GetAllShipmentMethods(db *gorm.DB) ([]data.ShipmentMethod, error) {
	var methods []data.ShipmentMethod
	result := db.Limit(-1).Find(&methods)

	if result.Error != nil {
		return nil, result.Error
	}
	return methods, nil
}

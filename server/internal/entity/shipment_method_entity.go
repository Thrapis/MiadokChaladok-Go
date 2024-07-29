package entity

import "gorm.io/gorm"

// ShipmentMethod - entity that represents shipment method of order.
type ShipmentMethod struct {
	gorm.Model
	Name string
}

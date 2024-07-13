package entity

import "gorm.io/gorm"

type ShipmentMethod struct {
	gorm.Model
	Name string
}

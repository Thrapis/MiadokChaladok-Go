package entity

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	CategoryID      uint
	TasteID         uint
	Name            string
	ImagePath       string
	Expiration      string
	Category        Category
	Taste           Taste
	Options         []Option
	Media           []Media
	ShipmentMethods []ShipmentMethod `gorm:"many2many:products_shipment_methods;"`
	Reviews         []Review
}

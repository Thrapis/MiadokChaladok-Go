package data

import "miadok-chaladok/internal/entity"

type Product struct {
	entity.GormModel
	CategoryID      uint             `json:"categoryId"`
	TasteID         uint             `json:"tasteId"`
	Name            string           `json:"name"`
	ImagePath       string           `json:"imagePath"`
	Expiration      string           `json:"expiration"`
	Category        Category         `json:"category"`
	Taste           Taste            `json:"taste"`
	Options         []Option         `json:"options"`
	Media           []Media          `json:"media"`
	ShipmentMethods []ShipmentMethod `json:"shipmentMethods" gorm:"many2many:products_shipment_methods;"`
	Reviews         []Review         `json:"reviews"`
}

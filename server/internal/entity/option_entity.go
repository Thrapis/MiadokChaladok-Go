package entity

import "gorm.io/gorm"

// Option - entity that represents product option.
type Option struct {
	gorm.Model
	ProductID    uint
	Name         string
	Volume       float32
	Price        float32
	ShopsOptions []ShopsOptions
	Product      Product
}

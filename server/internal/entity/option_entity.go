package entity

import "gorm.io/gorm"

type Option struct {
	gorm.Model
	ProductID    uint
	Name         string
	Volume       float32
	Price        float32
	ShopsOptions []ShopsOptions
	Product      Product
}

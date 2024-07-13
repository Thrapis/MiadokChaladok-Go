package entity

import "gorm.io/gorm"

type ShopsOptions struct {
	gorm.Model
	ShopID    uint
	OptionID  uint
	InStock   int
	InStorage int
}

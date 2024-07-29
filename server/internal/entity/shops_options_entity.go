package entity

import "gorm.io/gorm"

// ShopsOptions - entity that represents count of specific option in specific shop.
type ShopsOptions struct {
	gorm.Model
	ShopID    uint
	OptionID  uint
	InStock   int
	InStorage int
}

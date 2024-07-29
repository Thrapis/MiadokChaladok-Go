package entity

import "gorm.io/gorm"

// PromoCode - entity that represents promocode.
type PromoCode struct {
	gorm.Model
	Name string
}

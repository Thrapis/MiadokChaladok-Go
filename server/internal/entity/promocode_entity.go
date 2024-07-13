package entity

import "gorm.io/gorm"

type PromoCode struct {
	gorm.Model
	Name string
}

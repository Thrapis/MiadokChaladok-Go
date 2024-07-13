package entity

import "gorm.io/gorm"

type Suggestion struct {
	gorm.Model
	Notes     string
	ProductID uint
	Product   *Product
}

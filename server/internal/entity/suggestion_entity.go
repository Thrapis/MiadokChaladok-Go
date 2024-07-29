package entity

import "gorm.io/gorm"

// Suggestion - entity that represents suggested product.
type Suggestion struct {
	gorm.Model
	Notes     string
	ProductID uint
	Product   *Product
}

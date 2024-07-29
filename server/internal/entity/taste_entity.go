package entity

import "gorm.io/gorm"

// Taste - entity that represents taste of product.
type Taste struct {
	gorm.Model
	Name        string
	Description string
}

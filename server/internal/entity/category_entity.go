package entity

import "gorm.io/gorm"

// Category - entity that represents product category.
type Category struct {
	gorm.Model
	Name string
}

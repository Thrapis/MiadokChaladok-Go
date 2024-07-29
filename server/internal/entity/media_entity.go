package entity

import "gorm.io/gorm"

// Media - entity that represents product media.
type Media struct {
	gorm.Model
	ProductID uint
	Path      string
}

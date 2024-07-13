package entity

import "gorm.io/gorm"

type Media struct {
	gorm.Model
	ProductID uint
	Path      string
}

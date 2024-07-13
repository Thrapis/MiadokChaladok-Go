package entity

import "gorm.io/gorm"

type Taste struct {
	gorm.Model
	Name        string
	Description string
}

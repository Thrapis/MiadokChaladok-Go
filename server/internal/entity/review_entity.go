package entity

import (
	"time"

	"gorm.io/gorm"
)

type Review struct {
	gorm.Model
	ProductID  uint
	AuthorName string
	BuyDate    time.Time
	Rating     int16
	Comment    string
}

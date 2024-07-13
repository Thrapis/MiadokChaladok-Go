package entity

import "gorm.io/gorm"

type Shop struct {
	gorm.Model
	Name           string
	Address        string
	OpeningHours   string
	Phone          string
	StorageAddress string
}

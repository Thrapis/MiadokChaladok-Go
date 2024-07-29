package entity

import "gorm.io/gorm"

// Shop - entity that represents shop unit.
type Shop struct {
	gorm.Model
	Name           string
	Address        string
	OpeningHours   string
	Phone          string
	StorageAddress string
}

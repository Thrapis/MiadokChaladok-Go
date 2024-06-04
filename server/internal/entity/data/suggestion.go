package data

import "miadok-chaladok/internal/entity"

type Suggestion struct {
	entity.GormModel
	Notes     string   `json:"notes"`
	ProductID uint     `json:"productId"`
	Product   *Product `gorm:"foreignKey:ProductID"`
}

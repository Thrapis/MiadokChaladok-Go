package data

import "miadok-chaladok/internal/entity"

type Product struct {
	entity.GormModel
	CategoryID uint     `json:"categoryId"`
	TasteID    uint     `json:"tasteId"`
	Name       string   `json:"name"`
	ImagePath  string   `json:"imagePath"`
	Options    []Option `json:"options"`
}

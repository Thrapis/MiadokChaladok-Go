package data

import "miadok-chaladok/internal/entity"

type ShopsOptions struct {
	entity.GormModel
	ShopID    uint `json:"shopId"`
	OptionID  uint `json:"optionId"`
	InStock   int  `json:"inStock"`
	InStorage int  `json:"inStorage"`
}

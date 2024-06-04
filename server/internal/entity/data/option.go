package data

import "miadok-chaladok/internal/entity"

type Option struct {
	entity.GormModel
	ProductID uint    `json:"productId"`
	Name      string  `json:"name"`
	Volume    float32 `json:"volume"`
	Price     float32 `json:"price"`
}

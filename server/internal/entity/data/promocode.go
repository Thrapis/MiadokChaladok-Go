package data

import "miadok-chaladok/internal/entity"

type PromoCode struct {
	entity.GormModel
	Name string `json:"name"`
}

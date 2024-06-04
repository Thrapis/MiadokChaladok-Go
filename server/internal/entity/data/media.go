package data

import "miadok-chaladok/internal/entity"

type Media struct {
	entity.GormModel
	ProductID uint   `json:"productId"`
	Path      string `json:"imagePath"`
}

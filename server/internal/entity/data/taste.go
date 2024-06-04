package data

import "miadok-chaladok/internal/entity"

type Taste struct {
	entity.GormModel
	Name        string `json:"name"`
	Description string `json:"description"`
}

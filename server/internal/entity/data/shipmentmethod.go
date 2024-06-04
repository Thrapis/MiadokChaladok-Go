package data

import "miadok-chaladok/internal/entity"

type ShipmentMethod struct {
	entity.GormModel
	Name string `json:"name"`
}

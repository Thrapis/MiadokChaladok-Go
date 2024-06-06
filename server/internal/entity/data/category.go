package data

import "miadok-chaladok/internal/entity"

type Category struct {
	entity.GormModel
	Name string `json:"name"`
}

// func (c *Category) TableName() string {
// 	return "Category"
// }

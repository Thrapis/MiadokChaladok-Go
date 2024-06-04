package data

import (
	"miadok-chaladok/internal/entity"
	"time"
)

type Review struct {
	entity.GormModel
	ProductID  uint      `json:"productId"`
	AuthorName string    `json:"customerName"`
	BuyDate    time.Time `json:"buyDate"`
	Rating     int16     `json:"rating"`
	Comment    string    `json:"comment"`
}

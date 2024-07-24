package model

import (
	"time"

	"miadok-chaladok/pkg/utils"
)

type ReviewDescriptionResponse struct {
	ID         uint      `json:"id"`
	AuthorName string    `json:"authorName"`
	BuyDate    time.Time `json:"buyDate"`
	Rating     int16     `json:"rating"`
	Comment    string    `json:"comment"`
}

type CreateReviewRequest struct {
	ProductID     uint               `json:"productId"`
	AuthorName    string             `json:"authorName"`
	PaymentNumber string             `json:"paymentNumber"`
	Rating        int16              `json:"raiting"`
	BuyDate       utils.FormDateTime `json:"buyDate"`
	Comment       string             `json:"comment"`
}

type GetReviewsByProductIdRequest struct {
	ProductID uint `json:"-"`
	Page      uint `json:"-"`
	PageSize  uint `json:"-"`
}

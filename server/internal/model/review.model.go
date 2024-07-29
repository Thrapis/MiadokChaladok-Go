package model

import (
	"time"

	"miadok-chaladok/pkg/utils"
)

// ReviewDescriptionResponse - response dto of review description.
type ReviewDescriptionResponse struct {
	ID         uint      `json:"id"`
	AuthorName string    `json:"authorName"`
	BuyDate    time.Time `json:"buyDate"`
	Rating     int16     `json:"rating"`
	Comment    string    `json:"comment"`
}

// CreateReviewRequest - request dto with review creation parameters.
type CreateReviewRequest struct {
	ProductID     uint               `json:"productId"`
	AuthorName    string             `json:"authorName"`
	PaymentNumber string             `json:"paymentNumber"`
	Rating        int16              `json:"raiting"`
	BuyDate       utils.FormDateTime `json:"buyDate"`
	Comment       string             `json:"comment"`
}

// GetReviewsByProductIDRequest - request dto with review getting parameters.
type GetReviewsByProductIDRequest struct {
	ProductID uint `json:"-"`
	Page      uint `json:"-"`
	PageSize  uint `json:"-"`
}

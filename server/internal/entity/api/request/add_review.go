package request

import "miadok-chaladok/pkg/utils"

type AddReviewRequest struct {
	ProductId     uint               `json:"productId"`
	AuthorName    string             `json:"authorName"`
	PaymentNumber string             `json:"paymentNumber"`
	Rating        int16              `json:"raiting"`
	BuyDate       utils.FormDateTime `json:"buyDate"`
	Comment       string             `json:"comment"`
}

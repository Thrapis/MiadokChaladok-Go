package converter

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
)

func ReviewToDescriptionResponse(review *entity.Review) *model.ReviewDescriptionResponse {
	return &model.ReviewDescriptionResponse{
		ID:         review.ID,
		AuthorName: review.AuthorName,
		BuyDate:    review.BuyDate,
		Rating:     review.Rating,
		Comment:    review.Comment,
	}
}

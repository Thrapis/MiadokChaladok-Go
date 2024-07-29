package converter

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
)

// ReviewToDescriptionResponse - converts entity.Review into model.ReviewDescriptionResponse.
func ReviewToDescriptionResponse(review *entity.Review) *model.ReviewDescriptionResponse {
	return &model.ReviewDescriptionResponse{
		ID:         review.ID,
		AuthorName: review.AuthorName,
		BuyDate:    review.BuyDate,
		Rating:     review.Rating,
		Comment:    review.Comment,
	}
}

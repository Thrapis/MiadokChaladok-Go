package review

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
)

// IReviewRepository - interface of review repository required for ReviewUseCase.
type IReviewRepository interface {
	// GetReviewsByProductIdPaginated - returns page of reviews and
	// count of all reviews that belong to the product by ID.
	GetReviewsByProductIDPaginated(request *model.GetReviewsByProductIDRequest) ([]entity.Review, int64, error)
}

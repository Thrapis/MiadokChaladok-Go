// Package review provides description of review usecase.
package review

import (
	"context"
	"errors"

	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"
)

var errGettingFromRepository = errors.New("getting from repository failed")

// UseCase - entity of review usecase.
type UseCase struct {
	storage          app.IStorage
	log              app.ILogger
	reviewRepository IReviewRepository
}

// NewReviewUseCase - returns review UseCase instance.
func NewReviewUseCase(storage app.IStorage, logger app.ILogger,
	reviewRepository IReviewRepository,
) *UseCase {
	return &UseCase{
		storage:          storage,
		log:              logger,
		reviewRepository: reviewRepository,
	}
}

// Create - creates review.
//
// WARNING: Unimplemented!
func (c *UseCase) Create(_ context.Context, _ *model.CreateReviewRequest) error {
	// items, err := cart.GetCartProductOptions(c.DB, request)
	// if err != nil {
	// 	c.Log.WithError(err).Error("failed to find options")
	// 	return gin.Error{}
	// }

	/// TODO: implement review creation

	return nil
}

// GetByProductIDPaginated - returns page of reviews and
// count of all reviews that belong to the product by ID.
func (c *UseCase) GetByProductIDPaginated(_ context.Context, request *model.GetReviewsByProductIDRequest) ([]model.ReviewDescriptionResponse, int64, error) {
	reviews, total, err := c.reviewRepository.GetReviewsByProductIDPaginated(request)
	if err != nil {
		c.log.Error(err, "failed to find reviews")
		return nil, 0, errGettingFromRepository
	}

	responseReviews := make([]model.ReviewDescriptionResponse, len(reviews))
	for i, v := range reviews {
		responseReviews[i] = *converter.ReviewToDescriptionResponse(&v)
	}

	return responseReviews, total, nil
}

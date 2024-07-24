package review

import (
	"context"
	"errors"

	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"
)

var ErrGettingFromRepository = errors.New("getting from repository failed")

type reviewUseCase struct {
	storage          app.IStorage
	log              app.ILogger
	reviewRepository IReviewRepository
}

func NewReviewUseCase(storage app.IStorage, logger app.ILogger,
	reviewRepository IReviewRepository,
) *reviewUseCase {
	return &reviewUseCase{
		storage:          storage,
		log:              logger,
		reviewRepository: reviewRepository,
	}
}

func (c *reviewUseCase) Create(ctx context.Context, request *model.CreateReviewRequest) error {
	// items, err := cart.GetCartProductOptions(c.DB, request)
	// if err != nil {
	// 	c.Log.WithError(err).Error("failed to find options")
	// 	return gin.Error{}
	// }

	/// TODO: implement review creation

	return nil
}

func (c *reviewUseCase) GetByProductId(ctx context.Context, request *model.GetReviewsByProductIdRequest) ([]model.ReviewDescriptionResponse, int64, error) {
	reviews, total, err := c.reviewRepository.GetReviewsByProductIdPaginated(request)
	if err != nil {
		c.log.Error(err, "failed to find reviews")
		return nil, 0, ErrGettingFromRepository
	}

	responseReviews := make([]model.ReviewDescriptionResponse, len(reviews))
	for i, v := range reviews {
		responseReviews[i] = *converter.ReviewToDescriptionResponse(&v)
	}

	return responseReviews, total, nil
}

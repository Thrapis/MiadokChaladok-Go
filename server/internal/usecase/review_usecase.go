package usecase

import (
	"context"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"
	"miadok-chaladok/internal/repository"
	"miadok-chaladok/pkg/storage"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type ReviewUseCase struct {
	DB               *gorm.DB
	Storage          storage.StorageOperator
	Log              *logrus.Logger
	ReviewRepository *repository.ReviewRepository
}

func NewReviewUseCase(db *gorm.DB, storage storage.StorageOperator,
	logger *logrus.Logger, reviewRepository *repository.ReviewRepository) *ReviewUseCase {
	return &ReviewUseCase{
		DB:               db,
		Storage:          storage,
		Log:              logger,
		ReviewRepository: reviewRepository,
	}
}

func (c *ReviewUseCase) Create(ctx context.Context, request *model.CreateReviewRequest) error {

	// items, err := cart.GetCartProductOptions(c.DB, request)
	// if err != nil {
	// 	c.Log.WithError(err).Error("failed to find options")
	// 	return gin.Error{}
	// }

	/// TODO: implement review creation

	return nil
}

func (c *ReviewUseCase) GetByProductId(ctx context.Context, request *model.GetReviewsByProductIdRequest) ([]model.ReviewDescriptionResponse, int64, error) {

	reviews, total, err := c.ReviewRepository.GetReviewsByProductIdPaginated(request)
	if err != nil {
		c.Log.WithError(err).Error("failed to find reviews")
		return nil, 0, gin.Error{}
	}

	responseReviews := make([]model.ReviewDescriptionResponse, len(reviews))
	for i, v := range reviews {
		responseReviews[i] = *converter.ReviewToDescriptionResponse(&v)
	}

	return responseReviews, total, nil
}

package repository

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"

	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type ReviewRepository struct {
	Repository[entity.Review]
	Log *logrus.Logger
}

func NewReviewRepository(db *gorm.DB, log *logrus.Logger) *ReviewRepository {
	return &ReviewRepository{
		Repository: Repository[entity.Review]{
			DB: db,
		},
		Log: log,
	}
}

func (r *ReviewRepository) GetReviewsByProductIdPaginated(request *model.GetReviewsByProductIdRequest) ([]entity.Review, int64, error) {
	var total int64
	var reviews []entity.Review

	query := r.DB.Table("reviews r").
		Joins("INNER JOIN products p ON p.id = r.product_id").
		Where("p.id = ?", request.ProductID).
		Order("r.updated_at DESC NULLS LAST")

	countResult := query.Count(&total)
	if countResult.Error != nil {
		return nil, 0, countResult.Error
	}

	dataResult := query.Select("r.*").
		Limit(int(request.PageSize)).Offset(int((request.Page - 1) * request.PageSize)).
		Find(&reviews)
	if dataResult.Error != nil {
		return nil, 0, dataResult.Error
	}

	return reviews, total, nil
}

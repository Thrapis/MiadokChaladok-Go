package repository

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"

	"gorm.io/gorm"
)

type reviewRepository struct {
	repository[entity.Review]
}

func NewReviewRepository(db *gorm.DB) *reviewRepository {
	return &reviewRepository{
		repository: repository[entity.Review]{
			db: db,
		},
	}
}

func (r *reviewRepository) GetReviewsByProductIdPaginated(request *model.GetReviewsByProductIdRequest) ([]entity.Review, int64, error) {
	var total int64
	var reviews []entity.Review

	query := r.db.Table("reviews r").
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

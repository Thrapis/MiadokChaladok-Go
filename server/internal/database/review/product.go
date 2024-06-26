package review

import (
	"math"
	"miadok-chaladok/internal/entity/data"
	"miadok-chaladok/pkg/api/meta"

	"gorm.io/gorm"
)

func GetReviewsByProductIdPaginated(db *gorm.DB, productId uint, page, pageSize int) ([]*data.Review, *meta.PaginationMeta, error) {
	if page == 0 {
		page = 1
	}
	if pageSize == 0 {
		pageSize = 6
	}

	query := db.Table("reviews r").
		Joins("INNER JOIN products p ON p.id = r.product_id").
		Where("p.id = ?", productId).
		Order("r.updated_at DESC NULLS LAST")

	var count int64
	var reviews []*data.Review

	countResult := query.Count(&count)
	if countResult.Error != nil {
		return nil, nil, countResult.Error
	}

	dataResult := query.Select("r.*").
		Limit(pageSize).Offset((page - 1) * pageSize).
		Find(&reviews)
	if dataResult.Error != nil {
		return nil, nil, dataResult.Error
	}

	totalPages := int(math.Ceil(float64(count) / float64(pageSize)))
	meta := meta.NewPagintionMeta(page, pageSize, totalPages)

	return reviews, meta, nil
}

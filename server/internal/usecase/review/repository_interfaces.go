package review

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
)

type IReviewRepository interface {
	GetReviewsByProductIdPaginated(request *model.GetReviewsByProductIdRequest) ([]entity.Review, int64, error)
}

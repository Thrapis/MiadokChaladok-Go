package option

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
)

type IOptionRepository interface {
	GetCartItemOptions(request *model.GetCartItemsRequest) ([]entity.Option, error)
}

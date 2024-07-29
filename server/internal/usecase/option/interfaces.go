package option

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
)

// IOptionRepository - interface of option repository required for OptionUseCase.
type IOptionRepository interface {
	// GetCartItemOptions - returns options by IDs.
	GetCartItemOptions(request *model.GetCartItemsRequest) ([]entity.Option, error)
}

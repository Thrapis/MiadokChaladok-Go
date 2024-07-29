package lists

import "miadok-chaladok/internal/entity"

// ICategoryRepository - interface of category repository required for ListsUseCase.
type ICategoryRepository interface {
	// GetAll - returns all categories.
	GetAll() (entities []entity.Category, err error)
}

// ITasteRepository - interface of taste repository required for ListsUseCase.
type ITasteRepository interface {
	// GetAll - returns all tastes.
	GetAll() (entities []entity.Taste, err error)
}

// IShipmentMethodRepository - interface of shipment method repository required for ListsUseCase.
type IShipmentMethodRepository interface {
	// GetAll - returns all shipment methods.
	GetAll() (entities []entity.ShipmentMethod, err error)
}

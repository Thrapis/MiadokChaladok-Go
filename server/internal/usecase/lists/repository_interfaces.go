package lists

import "miadok-chaladok/internal/entity"

type ICategoryRepository interface {
	GetAll() (entities []entity.Category, err error)
}

type ITasteRepository interface {
	GetAll() (entities []entity.Taste, err error)
}

type IShipmentMethodRepository interface {
	GetAll() (entities []entity.ShipmentMethod, err error)
}

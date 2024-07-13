package converter

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
)

func CategoryToFilterResponse(category *entity.Category) *model.FilterRecordResponse {
	return &model.FilterRecordResponse{
		ID:   category.ID,
		Name: category.Name,
	}
}

func TasteToFilterResponse(taste *entity.Taste) *model.FilterRecordResponse {
	return &model.FilterRecordResponse{
		ID:   taste.ID,
		Name: taste.Name,
	}
}

func ShipmentMethodToFilterResponse(shipmentMethod *entity.ShipmentMethod) *model.FilterRecordResponse {
	return &model.FilterRecordResponse{
		ID:   shipmentMethod.ID,
		Name: shipmentMethod.Name,
	}
}

package converter

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
)

// CategoryToFilterResponse - converts entity.Category into model.FilterRecordResponse.
func CategoryToFilterResponse(category *entity.Category) *model.FilterRecordResponse {
	return &model.FilterRecordResponse{
		ID:   category.ID,
		Name: category.Name,
	}
}

// TasteToFilterResponse - converts entity.Taste into model.FilterRecordResponse.
func TasteToFilterResponse(taste *entity.Taste) *model.FilterRecordResponse {
	return &model.FilterRecordResponse{
		ID:   taste.ID,
		Name: taste.Name,
	}
}

// ShipmentMethodToFilterResponse - converts entity.ShipmentMethod into model.FilterRecordResponse.
func ShipmentMethodToFilterResponse(shipmentMethod *entity.ShipmentMethod) *model.FilterRecordResponse {
	return &model.FilterRecordResponse{
		ID:   shipmentMethod.ID,
		Name: shipmentMethod.Name,
	}
}

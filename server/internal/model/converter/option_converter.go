package converter

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
)

func OptionToItemResponse(option *entity.Option) *model.OptionItemResponse {
	converted := &model.OptionItemResponse{
		ID:               option.ID,
		Name:             option.Name,
		Price:            option.Price,
		Volume:           option.Volume,
		ProductID:        option.Product.ID,
		ProductName:      option.Product.Name,
		ProductImagePath: option.Product.ImagePath,
	}

	available := 0
	for _, v := range option.ShopsOptions {
		available += v.InStock + v.InStorage
	}
	converted.QuantityAvailable = available

	shipmentMethodsResponse := make([]model.OptionItemShipmentMethodResponse, len(option.Product.ShipmentMethods))
	for i, shipmentMethod := range option.Product.ShipmentMethods {
		shipmentMethodsResponse[i] = model.OptionItemShipmentMethodResponse{ID: shipmentMethod.ID, Name: shipmentMethod.Name}
	}
	converted.ShipmentMethods = shipmentMethodsResponse

	return converted
}

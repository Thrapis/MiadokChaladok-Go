package converter

import (
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
)

func ProductToDescriptionResponse(product *entity.Product) *model.ProductDescriptionResponse {
	converted := &model.ProductDescriptionResponse{
		ID:               product.ID,
		Name:             product.Name,
		ImagePath:        product.ImagePath,
		Expiration:       product.Expiration,
		CategoryName:     product.Category.Name,
		TasteName:        product.Taste.Name,
		TasteDescription: product.Taste.Description,
	}

	shipmentMethodName := make([]string, len(product.ShipmentMethods))
	for i, v := range product.ShipmentMethods {
		shipmentMethodName[i] = v.Name
	}
	converted.ShipmentMethodNames = shipmentMethodName

	mediaPaths := make([]string, len(product.Media))
	for i, v := range product.Media {
		mediaPaths[i] = v.Path
	}
	converted.MediaPaths = mediaPaths

	options := make([]model.ProductDescriptionOptionResponse, len(product.Options))
	inStock := 0
	inStorage := 0
	for i, v := range product.Options {
		options[i] = model.ProductDescriptionOptionResponse{ID: v.ID, Name: v.Name, Price: v.Price}
		for _, sv := range v.ShopsOptions {
			inStock += sv.InStock
			inStorage += sv.InStorage
		}
	}
	converted.Options = options
	converted.IsInStock = inStock > 0
	converted.IsInStorage = inStorage > 0

	return converted
}

func ProductToPreviewResponse(product *entity.Product) *model.ProductPreviewResponse {
	converted := &model.ProductPreviewResponse{
		ID:        product.ID,
		Name:      product.Name,
		ImagePath: product.ImagePath,
	}

	options := make([]model.ProductPreviewOptionResponse, len(product.Options))
	for i, v := range product.Options {
		options[i] = model.ProductPreviewOptionResponse{ID: v.ID, Name: v.Name, Price: v.Price}
	}
	converted.Options = options

	return converted
}

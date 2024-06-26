package viewmodel

import (
	"fmt"
	"math"
	"miadok-chaladok/internal/entity/data"
)

type ProductDto struct {
	ProductId       uint                  `json:"productId"`
	ProductName     string                `json:"productName"`
	ImagePath       string                `json:"imagePath"`
	Expiration      string                `json:"expiration"`
	PriceSpread     string                `json:"priceSpread"`
	Category        data.Category         `json:"category"`
	Taste           data.Taste            `json:"taste"`
	OptionList      []data.Option         `json:"optionList"`
	MediaList       []data.Media          `json:"mediaList"`
	ShipmentMethods []data.ShipmentMethod `json:"shipmentMethodList"`
	ReviewList      []data.Review         `json:"reviewList"`
}

func ToProductDtos(products []*data.Product) []*ProductDto {
	var productDtos = make([]*ProductDto, 0, len(products))
	for _, v := range products {
		dto := ToProductDto(v)
		productDtos = append(productDtos, dto)
	}
	return productDtos
}

func ToProductDto(product *data.Product) *ProductDto {
	card := &ProductDto{
		ProductId:       product.ID,
		ProductName:     product.Name,
		ImagePath:       product.ImagePath,
		Expiration:      product.Expiration,
		PriceSpread:     getSpread(product.Options),
		Category:        product.Category,
		Taste:           product.Taste,
		OptionList:      product.Options,
		MediaList:       product.Media,
		ShipmentMethods: product.ShipmentMethods,
		ReviewList:      product.Reviews,
	}
	return card
}

func getSpread(options []data.Option) string {
	var min float32 = math.MaxFloat32
	var max float32 = 0.0

	for _, v := range options {
		if min > v.Price {
			min = v.Price
		}
		if max < v.Price {
			max = v.Price
		}
	}

	if min == max {
		return fmt.Sprintf("%.2f", min)
	}
	return fmt.Sprintf("%.2f - %.2f", min, max)
}

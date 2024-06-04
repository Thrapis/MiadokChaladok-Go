package viewmodel

import (
	"fmt"
	"math"
	"miadok-chaladok/internal/entity/data"
)

type ProductDto struct {
	ProductId   uint          `json:"productId"`
	ProductName string        `json:"productName"`
	ImagePath   string        `json:"imagePath"`
	PriceSpread string        `json:"priceSpread"`
	OptionList  []data.Option `json:"optionList"`
}

func ToProductDto(product *data.Product) *ProductDto {
	card := &ProductDto{
		ProductId:   product.ID,
		ImagePath:   product.ImagePath,
		ProductName: product.Name,
		PriceSpread: getSpread(product.Options),
		OptionList:  product.Options,
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

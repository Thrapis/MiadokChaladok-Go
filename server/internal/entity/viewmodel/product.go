package viewmodel

import (
	"fmt"
	"math"
	"miadok-chaladok/internal/entity/data"
)

type ProductDto struct {
	ProductId   int64         `json:"productId"`
	ProductName string        `json:"productName"`
	ImagePath   string        `json:"imagePath"`
	PriceSpread string        `json:"priceSpread"`
	OptionList  []data.Option `json:"optionList"`
}

func GetProductCard(product *data.Product, options []*data.Option) *ProductDto {
	card := &ProductDto{
		ProductId:   product.Id,
		ProductName: product.Name,
		ImagePath:   product.ImagePath,
	}
	card.setOptions(options)
	return card
}

func (c *ProductDto) setOptions(options []*data.Option) {
	var min float32 = math.MaxFloat32
	var max float32 = 0.0

	c.OptionList = make([]data.Option, 0, len(options))
	for _, v := range options {
		c.OptionList = append(c.OptionList, *v)
		if min > v.Price {
			min = v.Price
		}
		if max < v.Price {
			max = v.Price
		}
	}

	if min == max {
		c.PriceSpread = fmt.Sprintf("%.2f", min)
	} else {
		c.PriceSpread = fmt.Sprintf("%.2f - %.2f", min, max)
	}
}

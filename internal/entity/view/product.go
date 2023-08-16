package view

import (
	"fmt"
	"math"
	"miadok-chaladok/internal/entity/data"
)

type ProductCard struct {
	ProductId   int64
	ProductName string
	ImagePath   string
	PriceSpread string
	OptionList  []OptionSelection
}

type OptionSelection struct {
	OptionId int64
	Name     string
	Price    float32
}

func GetProductCard(product *data.Product, options []*data.Option) *ProductCard {
	card := &ProductCard{
		ProductId:   product.Id,
		ProductName: product.Name,
		ImagePath:   product.ImagePath,
	}
	card.setOptions(options)
	return card
}

func (c *ProductCard) setOptions(options []*data.Option) {
	var min float32 = math.MaxFloat32
	var max float32 = 0.0

	c.OptionList = make([]OptionSelection, 0)
	for _, v := range options {
		c.OptionList = append(c.OptionList, OptionSelection{OptionId: v.Id, Name: v.Name, Price: v.Price})
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

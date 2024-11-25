package converter

import (
	"testing"

	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"

	"github.com/stretchr/testify/assert"
)

func TestOptionToItemResponse(t *testing.T) {
	got := entity.Option{
		ProductID: 0,
		Product: entity.Product{
			Name:      "Honey",
			ImagePath: "hon/img-1.jpg",
			ShipmentMethods: []entity.ShipmentMethod{
				{Name: "Ship"}, {Name: "Car"},
			},
		},
		Name:   "400g",
		Volume: 400,
		Price:  16,
		ShopsOptions: []entity.ShopsOptions{
			{InStock: 4, InStorage: 5},
			{InStock: 4, InStorage: 0},
			{InStock: 0, InStorage: 5},
		},
	}
	expected := model.OptionItemResponse{
		Name:              "400g",
		Volume:            400,
		Price:             16,
		ProductID:         0,
		ProductName:       "Honey",
		ProductImagePath:  "hon/img-1.jpg",
		QuantityAvailable: 18,
		ShipmentMethods: []model.OptionItemShipmentMethodResponse{
			{Name: "Ship"}, {Name: "Car"},
		},
	}

	actual := *converter.OptionToItemResponse(&got)

	assert.Equal(t, expected, actual)
}

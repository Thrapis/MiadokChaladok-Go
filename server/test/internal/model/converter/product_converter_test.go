package converter

import (
	"testing"

	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"

	"github.com/stretchr/testify/assert"
)

func TestProductToDescriptionResponse(t *testing.T) {
	got := entity.Product{
		Name:       "Honey",
		ImagePath:  "hon/img-1.jpg",
		Expiration: "2025-01-01",
		Category:   entity.Category{Name: "Categorized"},
		Taste:      entity.Taste{Name: "Tasty", Description: "Very tasty"},
		Options: []entity.Option{
			{
				Name:  "200g",
				Price: 13,
				ShopsOptions: []entity.ShopsOptions{
					{InStock: 4, InStorage: 0},
					{InStock: 3, InStorage: 0},
				},
			},
			{
				Name:  "350g",
				Price: 19,
				ShopsOptions: []entity.ShopsOptions{
					{InStock: 2, InStorage: 0},
				},
			},
		},
		Media: []entity.Media{
			{Path: "min/img-1.jpg"}, {Path: "min/img-2.jpg"}, {Path: "min/img-3.jpg"},
		},
		ShipmentMethods: []entity.ShipmentMethod{
			{Name: "Ship"}, {Name: "Car"},
		},
	}
	expected := model.ProductDescriptionResponse{
		Name:             "Honey",
		ImagePath:        "hon/img-1.jpg",
		Expiration:       "2025-01-01",
		IsInStock:        true,
		IsInStorage:      false,
		CategoryName:     "Categorized",
		TasteName:        "Tasty",
		TasteDescription: "Very tasty",
		ShipmentMethodNames: []string{
			"Ship", "Car",
		},
		MediaPaths: []string{
			"min/img-1.jpg", "min/img-2.jpg", "min/img-3.jpg",
		},
		Options: []model.ProductDescriptionOptionResponse{
			{Name: "200g", Price: 13}, {Name: "350g", Price: 19},
		},
	}

	actual := *converter.ProductToDescriptionResponse(&got)

	assert.Equal(t, expected, actual)
}

func TestProductToPreviewResponse(t *testing.T) {
	got := entity.Product{
		Name:      "Honey",
		ImagePath: "hon/img-1.jpg",
		Options: []entity.Option{
			{
				Name:  "200g",
				Price: 13,
			},
			{
				Name:  "350g",
				Price: 19,
			},
		},
	}
	expected := model.ProductPreviewResponse{
		Name:      "Honey",
		ImagePath: "hon/img-1.jpg",
		Options: []model.ProductPreviewOptionResponse{
			{Name: "200g", Price: 13}, {Name: "350g", Price: 19},
		},
	}

	actual := *converter.ProductToPreviewResponse(&got)

	assert.Equal(t, expected, actual)
}

package converter

import (
	"testing"

	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"

	"github.com/stretchr/testify/assert"
)

func TestCategoryToFilterResponse(t *testing.T) {
	got := entity.Category{Name: "Categorized"}
	expected := model.FilterRecordResponse{
		Name: "Categorized",
	}

	actual := *converter.CategoryToFilterResponse(&got)

	assert.Equal(t, expected, actual)
}

func TestTasteToFilterResponse(t *testing.T) {
	got := entity.Taste{Name: "Tasty"}
	expected := model.FilterRecordResponse{
		Name: "Tasty",
	}

	actual := *converter.TasteToFilterResponse(&got)

	assert.Equal(t, expected, actual)
}

func TestShipmentMethodToFilterResponse(t *testing.T) {
	got := entity.ShipmentMethod{Name: "Ship"}
	expected := model.FilterRecordResponse{
		Name: "Ship",
	}

	actual := *converter.ShipmentMethodToFilterResponse(&got)

	assert.Equal(t, expected, actual)
}

package model

import (
	"testing"

	"miadok-chaladok/internal/model"

	"github.com/stretchr/testify/assert"
)

func TestMarshalBinary(t *testing.T) {
	got := model.FilterListsResponse{
		Categories: []model.FilterRecordResponse{
			{ID: 1, Name: "Category1"},
			{ID: 2, Name: "Category2"},
		},
		Tastes: []model.FilterRecordResponse{
			{ID: 1, Name: "Taste1"},
			{ID: 2, Name: "Taste2"},
		},
		ShipmentMethods: []model.FilterRecordResponse{
			{ID: 1, Name: "Shipment1"},
			{ID: 2, Name: "Shipment2"},
		},
	}
	expected := []byte("{" +
		"\"categories\":[{\"id\":1,\"name\":\"Category1\"},{\"id\":2,\"name\":\"Category2\"}]," +
		"\"tastes\":[{\"id\":1,\"name\":\"Taste1\"},{\"id\":2,\"name\":\"Taste2\"}]," +
		"\"shipmentMethods\":[{\"id\":1,\"name\":\"Shipment1\"},{\"id\":2,\"name\":\"Shipment2\"}]" +
		"}")

	actual, err := got.MarshalBinary()

	assert.NoError(t, err)
	assert.Equal(t, expected, actual)
}

func TestUnmarshalBinary(t *testing.T) {
	got := []byte("{" +
		"\"categories\":[{\"id\":1,\"name\":\"Category1\"},{\"id\":2,\"name\":\"Category2\"}]," +
		"\"tastes\":[{\"id\":1,\"name\":\"Taste1\"},{\"id\":2,\"name\":\"Taste2\"}]," +
		"\"shipmentMethods\":[{\"id\":1,\"name\":\"Shipment1\"},{\"id\":2,\"name\":\"Shipment2\"}]" +
		"}")
	expected := model.FilterListsResponse{
		Categories: []model.FilterRecordResponse{
			{ID: 1, Name: "Category1"},
			{ID: 2, Name: "Category2"},
		},
		Tastes: []model.FilterRecordResponse{
			{ID: 1, Name: "Taste1"},
			{ID: 2, Name: "Taste2"},
		},
		ShipmentMethods: []model.FilterRecordResponse{
			{ID: 1, Name: "Shipment1"},
			{ID: 2, Name: "Shipment2"},
		},
	}

	actual := model.FilterListsResponse{}
	err := actual.UnmarshalBinary(got)

	assert.NoError(t, err)
	assert.Equal(t, expected, actual)
}

package response

import (
	"encoding/json"
	"miadok-chaladok/internal/entity/data"
)

type FilterListsResponse struct {
	Categories      []data.Category       `json:"categories"`
	Tastes          []data.Taste          `json:"tastes"`
	ShipmentMethods []data.ShipmentMethod `json:"shipmentMethods"`
}

func (fls *FilterListsResponse) MarshalBinary() ([]byte, error) {
	return json.Marshal(fls)
}

func (fls *FilterListsResponse) UnmarshalBinary(data []byte) error {
	return json.Unmarshal(data, fls)
}

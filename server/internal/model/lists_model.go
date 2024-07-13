package model

import "encoding/json"

type FilterListsResponse struct {
	Categories      []FilterRecordResponse `json:"categories"`
	Tastes          []FilterRecordResponse `json:"tastes"`
	ShipmentMethods []FilterRecordResponse `json:"shipmentMethods"`
}

type FilterRecordResponse struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

func (fls *FilterListsResponse) MarshalBinary() ([]byte, error) {
	return json.Marshal(fls)
}

func (fls *FilterListsResponse) UnmarshalBinary(data []byte) error {
	return json.Unmarshal(data, fls)
}

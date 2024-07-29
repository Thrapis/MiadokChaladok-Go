package model

import "encoding/json"

// FilterListsResponse - response dto of filter lists.
type FilterListsResponse struct {
	Categories      []FilterRecordResponse `json:"categories"`
	Tastes          []FilterRecordResponse `json:"tastes"`
	ShipmentMethods []FilterRecordResponse `json:"shipmentMethods"`
}

// FilterRecordResponse - response dto of filter list record.
type FilterRecordResponse struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

// MarshalBinary returns the JSON encoding of FilterListsResponse.
func (fls *FilterListsResponse) MarshalBinary() ([]byte, error) {
	return json.Marshal(fls)
}

// UnmarshalBinary parses the JSON-encoded data and stores the result in the value pointed to by FilterListsResponse.
func (fls *FilterListsResponse) UnmarshalBinary(data []byte) error {
	return json.Unmarshal(data, fls)
}

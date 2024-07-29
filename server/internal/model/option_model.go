package model

// OptionItemResponse - response dto of option item.
type OptionItemResponse struct {
	ID                uint                               `json:"id"`
	Name              string                             `json:"name"`
	Price             float32                            `json:"price"`
	Volume            float32                            `json:"volume"`
	ProductID         uint                               `json:"productId"`
	ProductName       string                             `json:"productName"`
	ProductImagePath  string                             `json:"productImagePath"`
	QuantityAvailable int                                `json:"quantityAvailable"`
	ShipmentMethods   []OptionItemShipmentMethodResponse `json:"shipmentMethods"`
}

// OptionItemShipmentMethodResponse - response dto of option item shipment method.
type OptionItemShipmentMethodResponse struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

// GetCartItemsRequest - request dto with option IDs parameter.
type GetCartItemsRequest struct {
	OptionIDs []uint `json:"optionIds"`
}

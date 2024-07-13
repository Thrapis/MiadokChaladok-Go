package model

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

type OptionItemShipmentMethodResponse struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

type GetCartItemsRequest struct {
	OptionIds []uint `json:"optionIds"`
}

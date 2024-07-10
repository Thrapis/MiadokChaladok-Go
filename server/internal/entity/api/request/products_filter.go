package request

type ProductsFilterRequest struct {
	IgnoreFilters     bool    `json:"ignoreFilters"`
	CategoryIds       []uint  `json:"categoryIds"`
	TasteIds          []uint  `json:"tasteIds"`
	PriceFrom         float32 `json:"priceFrom"`
	PriceTo           float32 `json:"priceTo"`
	VolumeFrom        float32 `json:"volumeFrom"`
	VolumeTo          float32 `json:"volumeTo"`
	InShop            bool    `json:"inShop"`
	InStock           bool    `json:"inStock"`
	ShipmentMethodIds []uint  `json:"shipmentMethodIds"`
	SortType          uint    `json:"sortType"`
}

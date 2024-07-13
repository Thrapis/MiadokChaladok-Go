package model

type ProductDescriptionResponse struct {
	ID                  uint                               `json:"id"`
	Name                string                             `json:"name"`
	ImagePath           string                             `json:"imagePath"`
	Expiration          string                             `json:"expiration"`
	IsInStock           bool                               `json:"isInStock"`
	IsInStorage         bool                               `json:"isInStorage"`
	CategoryName        string                             `json:"categoryName"`
	TasteName           string                             `json:"tasteName"`
	TasteDescription    string                             `json:"tasteDescription"`
	ShipmentMethodNames []string                           `json:"shipmentMethodNames"`
	MediaPaths          []string                           `json:"mediaPaths"`
	Options             []ProductDescriptionOptionResponse `json:"options"`
}

type ProductDescriptionOptionResponse struct {
	ID    uint    `json:"id"`
	Name  string  `json:"name"`
	Price float32 `json:"price"`
}

type ProductPreviewResponse struct {
	ID        uint                           `json:"id"`
	Name      string                         `json:"name"`
	ImagePath string                         `json:"imagePath"`
	Options   []ProductPreviewOptionResponse `json:"options"`
}

type ProductPreviewOptionResponse struct {
	ID    uint    `json:"id"`
	Name  string  `json:"name"`
	Price float32 `json:"price"`
}

type GetProductDescriptionRequest struct {
	ProductID uint `json:"-"`
}

type GetSuggestionsRequest struct {
	Limit int `json:"-"`
}

type SortType uint

const (
	SortByPopular   SortType = iota + 1
	SortByCheapest  SortType = iota + 1
	SortByExpensive SortType = iota + 1
	SortByNew       SortType = iota + 1
	SortByReview    SortType = iota + 1
)

type GetProductsByFilterPaginatedRequest struct {
	IgnoreFilters     bool     `json:"ignoreFilters"`
	CategoryIds       []uint   `json:"categoryIds"`
	TasteIds          []uint   `json:"tasteIds"`
	PriceFrom         float32  `json:"priceFrom"`
	PriceTo           float32  `json:"priceTo"`
	VolumeFrom        float32  `json:"volumeFrom"`
	VolumeTo          float32  `json:"volumeTo"`
	InShop            bool     `json:"inShop"`
	InStock           bool     `json:"inStock"`
	ShipmentMethodIds []uint   `json:"shipmentMethodIds"`
	SortType          SortType `json:"sortType"`
	Page              uint     `json:"-"`
	PageSize          uint     `json:"-"`
}

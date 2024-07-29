package model

// ProductDescriptionResponse - response dto of product description.
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

// ProductDescriptionOptionResponse - response dto of product description option.
type ProductDescriptionOptionResponse struct {
	ID    uint    `json:"id"`
	Name  string  `json:"name"`
	Price float32 `json:"price"`
}

// ProductPreviewResponse - response dto of product preview.
type ProductPreviewResponse struct {
	ID        uint                           `json:"id"`
	Name      string                         `json:"name"`
	ImagePath string                         `json:"imagePath"`
	Options   []ProductPreviewOptionResponse `json:"options"`
}

// ProductPreviewOptionResponse - response dto of product preview option.
type ProductPreviewOptionResponse struct {
	ID    uint    `json:"id"`
	Name  string  `json:"name"`
	Price float32 `json:"price"`
}

// GetProductDescriptionRequest - request dto with product ID parameter.
type GetProductDescriptionRequest struct {
	ProductID uint `json:"-"`
}

// GetSuggestionsRequest - request dto with limit parameter.
type GetSuggestionsRequest struct {
	Limit int `json:"-"`
}

// SortType - type of sorting.
type SortType uint

const (
	// SortByPopular - sorting by popular.
	SortByPopular SortType = iota + 1
	// SortByCheapest - sorting by cheapest.
	SortByCheapest SortType = iota + 1
	// SortByExpensive - sorting by expensive.
	SortByExpensive SortType = iota + 1
	// SortByNew - sorting by new.
	SortByNew SortType = iota + 1
	// SortByReview - sorting by biggest review count.
	SortByReview SortType = iota + 1
)

// GetProductsByFilterPaginatedRequest - request dto with filter parameters.
type GetProductsByFilterPaginatedRequest struct {
	IgnoreFilters     bool     `json:"ignoreFilters"`
	CategoryIDs       []uint   `json:"categoryIds"`
	TasteIDs          []uint   `json:"tasteIds"`
	PriceFrom         float32  `json:"priceFrom"`
	PriceTo           float32  `json:"priceTo"`
	VolumeFrom        float32  `json:"volumeFrom"`
	VolumeTo          float32  `json:"volumeTo"`
	InShop            bool     `json:"inShop"`
	InStock           bool     `json:"inStock"`
	ShipmentMethodIDs []uint   `json:"shipmentMethodIds"`
	SortType          SortType `json:"sortType"`
	Page              uint     `json:"-"`
	PageSize          uint     `json:"-"`
}

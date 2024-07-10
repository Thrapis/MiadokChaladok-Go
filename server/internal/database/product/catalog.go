package product

import (
	"fmt"
	"math"
	"miadok-chaladok/internal/entity/data"
	"miadok-chaladok/pkg/api/meta"

	"gorm.io/gorm"
)

type SortType uint

const (
	SortByPopular   SortType = iota + 1
	SortByCheapest  SortType = iota + 1
	SortByExpensive SortType = iota + 1
	SortByNew       SortType = iota + 1
	SortByReview    SortType = iota + 1
)

type FilterParameters struct {
	IgnoreFilters     bool
	CategoryIds       []uint
	TasteIds          []uint
	PriceFrom         float32
	PriceTo           float32
	VolumeFrom        float32
	VolumeTo          float32
	InShop            bool
	InStock           bool
	ShipmentMethodIds []uint
	SortType          SortType
}

func GetProductsByFilterPaginated(db *gorm.DB, filters FilterParameters, page, pageSize int) ([]*data.Product, *meta.PaginationMeta, error) {
	if page == 0 {
		page = 1
	}
	if pageSize == 0 {
		pageSize = 6
	}
	if filters.SortType < SortByPopular || SortByReview < filters.SortType {
		filters.SortType = SortByPopular
	}

	criteriaSQ := &gorm.DB{}
	orderDirection := ""

	switch filters.SortType {
	case SortByPopular:
		criteriaSQ = db.Select("SUM(s_i_oo.quantity)").Table("orders as s_i_ord").
			Joins("INNER JOIN orders_options as s_i_oo ON s_i_ord.id = s_i_oo.order_id").
			Joins("INNER JOIN options as s_i_opt ON s_i_opt.id = s_i_oo.option_id").
			Where("s_i_opt.product_id = p_inner.id")
		orderDirection = "DESC NULLS LAST"
	case SortByCheapest:
		criteriaSQ = db.Select("MIN(price)").Table("options").
			Where("product_id = p_inner.id")
		orderDirection = "ASC NULLS LAST"
	case SortByExpensive:
		criteriaSQ = db.Select("MAX(price)").Table("options").
			Where("product_id = p_inner.id")
		orderDirection = "DESC NULLS LAST"
	case SortByNew:
		criteriaSQ = db.Select("created_at").Table("products").
			Where("id = p_inner.id")
		orderDirection = "DESC NULLS LAST"
	case SortByReview:
		criteriaSQ = db.Select("COUNT(*)").Table("products as s_i_p").
			Joins("INNER JOIN reviews as s_i_r ON s_i_r.product_id = s_i_p.id").
			Where("s_i_p.id = p_inner.id")
		orderDirection = "DESC NULLS LAST"
	}
	orderBy := fmt.Sprintf("ordering_select.ordering_criteria %s", orderDirection)

	orderingSelectSQ := db.Select("p_inner.id, (?)", criteriaSQ).Table("products as p_inner")

	hasRequiredShipmentMethodsSQ := db.
		Select("COUNT(*) = ? as b", len(filters.ShipmentMethodIds)).
		Table("products_shipment_methods psm").
		Where("psm.product_id = p.id").
		Where("psm.shipment_method_id IN ?", filters.ShipmentMethodIds)

	query := db.Table("products as p").
		Joins("INNER JOIN (?) as ordering_select(product_id, ordering_criteria) ON p.id = ordering_select.product_id", orderingSelectSQ).
		Joins("INNER JOIN options o ON o.product_id = p.id", orderingSelectSQ).
		Joins("INNER JOIN shops_options so ON so.option_id = o.id AND so.shop_id = 1", orderingSelectSQ)

	if !filters.IgnoreFilters {
		query = query.
			Where("o.price BETWEEN ? AND ?", filters.PriceFrom, filters.PriceTo).
			Where("o.volume BETWEEN ? AND ?", filters.VolumeFrom, filters.VolumeTo).
			Where("p.category_id IN ?", filters.CategoryIds).
			Where("p.taste_id IN ?", filters.TasteIds).
			Where("(?)", hasRequiredShipmentMethodsSQ)

		if filters.InStock {
			query = query.Where("so.in_stock > 0")
		}

		if filters.InShop {
			query = query.Where("so.in_storage > 0")
		}
	}

	var count int64
	var products []*data.Product

	query = query.Group("p.id, ordering_select.ordering_criteria").Order(orderBy)

	countResult := query.Count(&count)
	if countResult.Error != nil {
		return nil, nil, countResult.Error
	}

	dataResult := query.Select("p.*").
		Limit(pageSize).Offset((page - 1) * pageSize).
		Preload("Options").Find(&products)
	if dataResult.Error != nil {
		return nil, nil, dataResult.Error
	}

	totalPages := int(math.Ceil(float64(count) / float64(pageSize)))
	meta := meta.NewPagintionMeta(page, pageSize, totalPages)

	return products, meta, nil
}

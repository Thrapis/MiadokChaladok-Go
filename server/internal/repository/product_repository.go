package repository

import (
	"fmt"
	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"

	"gorm.io/gorm"
)

type productRepository struct {
	repository[entity.Product]
}

func NewProductRepository(db *gorm.DB) *productRepository {
	return &productRepository{
		repository: repository[entity.Product]{
			db: db,
		},
	}
}

func (r *productRepository) GetProductDescriptionById(request *model.GetProductDescriptionRequest) (*entity.Product, error) {
	var product *entity.Product

	result := r.db.Table("products").Where("id = ?", request.ProductID).
		Preload("Category").Preload("Taste").
		Preload("Options").Preload("ShipmentMethods").
		Preload("Media").
		Preload("Options.ShopsOptions").
		Take(&product)
	if result.Error != nil {
		return nil, result.Error
	}

	return product, nil
}

func (r *productRepository) GetSuggestedProducts(request *model.GetSuggestionsRequest) ([]entity.Product, error) {
	var products []entity.Product

	result := r.db.Select("p.*").Table("products as p").
		Joins("INNER JOIN suggestions s ON s.product_id = p.id").
		Limit(request.Limit).
		Preload("Options").Find(&products)
	if result.Error != nil {
		return nil, result.Error
	}

	return products, nil
}

func (r *productRepository) GetProductsByFilterPaginated(request *model.GetProductsByFilterPaginatedRequest) ([]entity.Product, int64, error) {
	criteriaSQ := &gorm.DB{}
	orderDirection := ""

	switch request.SortType {
	case model.SortByPopular:
		criteriaSQ = r.db.Select("SUM(s_i_oo.quantity)").Table("orders as s_i_ord").
			Joins("INNER JOIN orders_options as s_i_oo ON s_i_ord.id = s_i_oo.order_id").
			Joins("INNER JOIN options as s_i_opt ON s_i_opt.id = s_i_oo.option_id").
			Where("s_i_opt.product_id = p_inner.id")
		orderDirection = "DESC NULLS LAST"
	case model.SortByCheapest:
		criteriaSQ = r.db.Select("MIN(price)").Table("options").
			Where("product_id = p_inner.id")
		orderDirection = "ASC NULLS LAST"
	case model.SortByExpensive:
		criteriaSQ = r.db.Select("MAX(price)").Table("options").
			Where("product_id = p_inner.id")
		orderDirection = "DESC NULLS LAST"
	case model.SortByNew:
		criteriaSQ = r.db.Select("created_at").Table("products").
			Where("id = p_inner.id")
		orderDirection = "DESC NULLS LAST"
	case model.SortByReview:
		criteriaSQ = r.db.Select("COUNT(*)").Table("products as s_i_p").
			Joins("INNER JOIN reviews as s_i_r ON s_i_r.product_id = s_i_p.id").
			Where("s_i_p.id = p_inner.id")
		orderDirection = "DESC NULLS LAST"
	}
	orderBy := fmt.Sprintf("ordering_select.ordering_criteria %s", orderDirection)

	orderingSelectSQ := r.db.Select("p_inner.id, (?)", criteriaSQ).Table("products as p_inner")

	query := r.db.Table("products as p").
		Joins("INNER JOIN (?) as ordering_select(product_id, ordering_criteria) ON p.id = ordering_select.product_id", orderingSelectSQ).
		Joins("INNER JOIN options o ON o.product_id = p.id", orderingSelectSQ).
		Joins("INNER JOIN shops_options so ON so.option_id = o.id AND so.shop_id = 1", orderingSelectSQ)

	if !request.IgnoreFilters {
		hasRequiredShipmentMethodsSQ := r.db.
			Select("COUNT(*) = ? as b", len(request.ShipmentMethodIds)).
			Table("products_shipment_methods psm").
			Where("psm.product_id = p.id").
			Where("psm.shipment_method_id IN ?", request.ShipmentMethodIds)

		query = query.
			Where("o.price BETWEEN ? AND ?", request.PriceFrom, request.PriceTo).
			Where("o.volume BETWEEN ? AND ?", request.VolumeFrom, request.VolumeTo).
			Where("p.category_id IN ?", request.CategoryIds).
			Where("p.taste_id IN ?", request.TasteIds).
			Where("(?)", hasRequiredShipmentMethodsSQ)

		if request.InStock {
			query = query.Where("so.in_stock > 0")
		}

		if request.InShop {
			query = query.Where("so.in_storage > 0")
		}
	}

	var total int64
	var products []entity.Product

	query = query.Group("p.id, ordering_select.ordering_criteria").Order(orderBy)

	countResult := query.Count(&total)
	if countResult.Error != nil {
		return nil, 0, countResult.Error
	}

	dataResult := query.Select("p.*").
		Limit(int(request.PageSize)).Offset(int((request.Page - 1) * request.PageSize)).
		Preload("Options").Find(&products)
	if dataResult.Error != nil {
		return nil, 0, dataResult.Error
	}

	return products, total, nil
}

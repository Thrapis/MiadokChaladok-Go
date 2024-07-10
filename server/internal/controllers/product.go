package controllers

import (
	"math"
	"miadok-chaladok/internal/config"
	dbp "miadok-chaladok/internal/database/product"
	"miadok-chaladok/internal/entity/api/request"
	"miadok-chaladok/pkg/api"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetProductById(c *gin.Context) {
	productIdString := c.Query("productId")
	productId, _ := strconv.ParseUint(productIdString, 0, 64)

	db := config.GetDb()
	product, err := dbp.GetProductById(db, uint(productId))

	if err != nil {
		api.RespondJSON(c, http.StatusNotFound, product, nil)
		return
	}
	api.RespondJSON(c, http.StatusOK, product, nil)
}

func GetSuggestions(c *gin.Context) {
	maxCountString := c.Query("limit")
	limit, _ := strconv.ParseInt(maxCountString, 0, 64)

	db := config.GetDb()
	products, err := dbp.GetSuggestedProducts(db, int(limit))

	if err != nil {
		api.RespondJSON(c, http.StatusNotFound, products, nil)
		return
	}
	api.RespondJSON(c, http.StatusOK, products, nil)
}

func GetProductsByFilterPaginated(c *gin.Context) {

	pageString := c.Query("page")
	page, _ := strconv.ParseUint(pageString, 10, 64)
	pageSizeString := c.Query("pageSize")
	pageSize, _ := strconv.ParseUint(pageSizeString, 10, 64)

	var requestBody = request.ProductsFilterRequest{
		PriceFrom:  -1,
		PriceTo:    math.MaxFloat32,
		VolumeFrom: -1,
		VolumeTo:   math.MaxFloat32,
	}

	err := c.BindJSON(&requestBody)
	if err != nil {
		panic(err)
	}

	filters := dbp.FilterParameters{
		IgnoreFilters:     requestBody.IgnoreFilters,
		CategoryIds:       requestBody.CategoryIds,
		TasteIds:          requestBody.TasteIds,
		PriceFrom:         requestBody.PriceFrom,
		PriceTo:           requestBody.PriceTo,
		VolumeFrom:        requestBody.VolumeFrom,
		VolumeTo:          requestBody.VolumeTo,
		InShop:            requestBody.InShop,
		InStock:           requestBody.InStock,
		ShipmentMethodIds: requestBody.ShipmentMethodIds,
		SortType:          dbp.SortType(requestBody.SortType),
	}

	db := config.GetDb()
	products, meta, err := dbp.GetProductsByFilterPaginated(db, filters, int(page), int(pageSize))

	if err != nil {
		api.RespondJSON(c, http.StatusNotFound, products, meta)
		return
	}
	api.RespondJSON(c, http.StatusOK, products, meta)
}

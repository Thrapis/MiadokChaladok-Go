package routes

import (
	"fmt"
	"math"
	"miadok-chaladok/internal/config"
	dbp "miadok-chaladok/internal/database/product"
	"miadok-chaladok/pkg/api"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetProductById(c *gin.Context) {
	productIdString := c.Params.ByName("id")
	productId, _ := strconv.ParseUint(productIdString, 0, 64)

	db := config.GetDb()
	product, err := dbp.GetProductDtoById(db, uint(productId))

	if err != nil {
		api.RespondJSON(c, http.StatusNotFound, product, nil)
		return
	}
	api.RespondJSON(c, http.StatusOK, product, nil)
}

func GetProductSuggestions(c *gin.Context) {
	maxCountString := c.Params.ByName("limit")
	limit, _ := strconv.ParseInt(maxCountString, 0, 64)

	db := config.GetDb()
	products, err := dbp.GetSuggestedProductDtos(db, int(limit))

	if err != nil {
		api.RespondJSON(c, http.StatusNotFound, products, nil)
		return
	}
	api.RespondJSON(c, http.StatusOK, products, nil)
}

func GetProductsByFilter(c *gin.Context) {
	pageString := c.Query("page")
	page, _ := strconv.ParseUint(pageString, 10, 64)
	pageSizeString := c.Query("pageSize")
	pageSize, _ := strconv.ParseUint(pageSizeString, 10, 64)

	var requestBody = dbp.FilterParameters{
		PriceFrom:  -1,
		PriceTo:    math.MaxFloat32,
		VolumeFrom: -1,
		VolumeTo:   math.MaxFloat32,
		SortType:   dbp.SortByPopular,
	}

	err := c.BindJSON(&requestBody)
	if err != nil {
		panic(err)
	}

	db := config.GetDb()
	products, meta, err := dbp.GetProductDtosByFilter(db, requestBody, int(page), int(pageSize))

	if err != nil {
		api.RespondJSON(c, http.StatusNotFound, products, meta)
		return
	}
	api.RespondJSON(c, http.StatusOK, products, meta)
}

func ProductToCart(c *gin.Context) {
	type CartRequest struct {
		ProductId uint `json:"productId"`
		OptionId  uint `json:"optionId"`
	}

	var request CartRequest
	err := c.BindJSON(&request)
	if err != nil {
		panic(err)
	}

	fmt.Print("Option: ")
	fmt.Println(request)

	api.RespondJSON(c, http.StatusOK, nil, nil)
}

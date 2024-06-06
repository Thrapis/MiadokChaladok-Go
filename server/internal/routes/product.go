package routes

import (
	"fmt"
	"miadok-chaladok/internal/config"
	"miadok-chaladok/internal/database"
	"miadok-chaladok/pkg/api"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetProductById(c *gin.Context) {
	productIdString := c.Params.ByName("id")
	productId, _ := strconv.ParseUint(productIdString, 0, 64)

	db := config.GetDb()
	product, err := database.GetProductDtoById(db, uint(productId))

	if err != nil {
		api.RespondJSON(c, http.StatusNotFound, product)
	}
	api.RespondJSON(c, http.StatusOK, product)
}

func GetProductSuggestions(c *gin.Context) {
	maxCountString := c.Params.ByName("limit")
	limit, _ := strconv.ParseInt(maxCountString, 0, 64)

	db := config.GetDb()
	products, err := database.GetSuggestedProductDtos(db, int(limit))

	if err != nil {
		api.RespondJSON(c, http.StatusNotFound, products)
	}
	api.RespondJSON(c, http.StatusOK, products)
}

func GetProductsByFilter(c *gin.Context) {
	maxCountString := c.Params.ByName("limit")
	limit, _ := strconv.ParseInt(maxCountString, 0, 64)

	db := config.GetDb()
	products, err := database.GetProductDtosByFilter(db, int(limit))

	if err != nil {
		api.RespondJSON(c, http.StatusNotFound, products)
	}
	api.RespondJSON(c, http.StatusOK, products)
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

	api.RespondJSON(c, http.StatusOK, nil)
}

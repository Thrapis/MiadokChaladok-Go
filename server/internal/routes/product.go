package routes

import (
	"fmt"
	"miadok-chaladok/internal/database"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetProductById(c *gin.Context) {
	productIdString := c.Params.ByName("id")
	productId, _ := strconv.ParseUint(productIdString, 0, 64)

	pc := database.GetProductDtoById(uint(productId))

	c.JSON(http.StatusOK, gin.H{"product": pc})
}

func GetProductSuggestions(c *gin.Context) {
	maxCountString := c.Params.ByName("limit")
	limit, _ := strconv.ParseInt(maxCountString, 0, 64)

	pc := database.GetSuggestedProductDtos(int(limit))

	c.JSON(http.StatusOK, gin.H{"products": pc})
}

func GetProductsByFilter(c *gin.Context) {
	maxCountString := c.Params.ByName("limit")
	limit, _ := strconv.ParseInt(maxCountString, 0, 64)

	pc := database.GetProductDtosByFilter(int(limit))

	c.JSON(http.StatusOK, gin.H{"products": pc})
}

type CartRequest struct {
	ProductId uint `json:"productId"`
	OptionId  uint `json:"optionId"`
}

func ProductToCart(c *gin.Context) {
	var request CartRequest
	err := c.BindJSON(&request)
	if err != nil {
		panic(err)
	}

	fmt.Print("Option: ")
	fmt.Println(request)

	c.JSON(http.StatusOK, gin.H{"reponse": "ok"})
}

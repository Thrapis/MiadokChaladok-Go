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
	productId, _ := strconv.ParseInt(productIdString, 0, 64)

	pc := database.GetProductCardById(productId)

	c.JSON(http.StatusOK, gin.H{"product": pc})
}

func GetProductSuggestions(c *gin.Context) {
	maxCountString := c.Params.ByName("maxCount")
	maxCount, _ := strconv.ParseInt(maxCountString, 0, 32)

	pc := database.GetSuggestedProductCards(maxCount)

	c.JSON(http.StatusOK, gin.H{"products": pc})
}

type CartRequest struct {
	ProductId int64 `json:"productId,string,omitempty"`
	OptionId  int64 `json:"optionId,string,omitempty"`
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

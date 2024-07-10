package controllers

import (
	"miadok-chaladok/internal/config"
	"miadok-chaladok/internal/database/cart"
	"miadok-chaladok/pkg/api"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetCartItems(c *gin.Context) {
	var requestData []uint
	err := c.BindJSON(&requestData)
	if err != nil {
		panic(err)
	}

	db := config.GetDb()
	cartItems, err := cart.GetCartProductOptions(db, requestData)

	if err != nil {
		api.RespondJSON(c, http.StatusNotFound, nil, nil)
		return
	}
	api.RespondJSON(c, http.StatusOK, cartItems, nil)
}

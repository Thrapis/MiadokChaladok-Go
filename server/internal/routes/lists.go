package routes

import (
	"miadok-chaladok/internal/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllCategories(c *gin.Context) {
	categories := database.GetAllCategories()

	c.JSON(http.StatusOK, gin.H{"categories": categories})
}

func GetAllTastes(c *gin.Context) {
	tastes := database.GetAllTastes()

	c.JSON(http.StatusOK, gin.H{"tastes": tastes})
}

func GetFilterData(c *gin.Context) {
	categories := database.GetAllCategories()
	tastes := database.GetAllTastes()
	methods := database.GetAllShipmentMethods()

	c.JSON(http.StatusOK, gin.H{
		"categories":      categories,
		"tastes":          tastes,
		"shipmentMethods": methods,
	})
}

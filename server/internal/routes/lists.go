package routes

import (
	"miadok-chaladok/internal/config"
	"miadok-chaladok/internal/database"
	"miadok-chaladok/pkg/api"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllCategories(c *gin.Context) {
	db := config.GetDb()
	categories, err := database.GetAllCategories(db)

	if err != nil {
		api.RespondJSON(c, http.StatusNotFound, categories)
	}
	api.RespondJSON(c, http.StatusOK, categories)
}

func GetAllTastes(c *gin.Context) {
	db := config.GetDb()
	tastes, err := database.GetAllTastes(db)

	if err != nil {
		api.RespondJSON(c, http.StatusNotFound, tastes)
	}
	api.RespondJSON(c, http.StatusOK, tastes)
}

func GetFilterData(c *gin.Context) {
	db := config.GetDb()
	categories, _ := database.GetAllCategories(db)
	tastes, _ := database.GetAllTastes(db)
	methods, _ := database.GetAllShipmentMethods(db)

	payload := gin.H{
		"categories":      categories,
		"tastes":          tastes,
		"shipmentMethods": methods,
	}

	api.RespondJSON(c, http.StatusOK, payload)
}

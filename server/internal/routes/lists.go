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
		api.RespondJSON(c, http.StatusNotFound, categories, nil)
		return
	}
	api.RespondJSON(c, http.StatusOK, categories, nil)
}

func GetAllTastes(c *gin.Context) {
	db := config.GetDb()
	tastes, err := database.GetAllTastes(db)

	if err != nil {
		api.RespondJSON(c, http.StatusNotFound, tastes, nil)
		return
	}
	api.RespondJSON(c, http.StatusOK, tastes, nil)
}

func GetFilterData(c *gin.Context) {
	db := config.GetDb()
	categories, _ := database.GetAllCategories(db)
	tastes, _ := database.GetAllTastes(db)
	methods, _ := database.GetAllShipmentMethods(db)

	data := gin.H{
		"categories":      categories,
		"tastes":          tastes,
		"shipmentMethods": methods,
	}

	api.RespondJSON(c, http.StatusOK, data, nil)
}

package controllers

import (
	"miadok-chaladok/internal/config"
	"miadok-chaladok/internal/database/static"
	"miadok-chaladok/internal/entity/api/response"
	"miadok-chaladok/pkg/api"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

const filterListsStorageKey = "FilterLists"
const filterListsStorageDuration = time.Hour * 6

func GetFilterLists(c *gin.Context) {
	data := response.FilterListsResponse{}

	err := config.GetStorage().GetStruct(ctx, filterListsStorageKey, &data)
	if err == nil {
		api.RespondJSON(c, http.StatusOK, data, nil)
		return
	}

	db := config.GetDb()
	categories, err := static.GetAllCategories(db)
	if err != nil {
		api.RespondJSON(c, http.StatusInternalServerError, nil, nil)
		return
	}

	tastes, err := static.GetAllTastes(db)
	if err != nil {
		api.RespondJSON(c, http.StatusInternalServerError, nil, nil)
		return
	}

	methods, err := static.GetAllShipmentMethods(db)
	if err != nil {
		api.RespondJSON(c, http.StatusInternalServerError, nil, nil)
		return
	}

	data = response.FilterListsResponse{
		Categories:      categories,
		Tastes:          tastes,
		ShipmentMethods: methods,
	}

	err = config.GetStorage().SetStruct(ctx, filterListsStorageKey, &data, filterListsStorageDuration)
	if err != nil {
		api.RespondJSON(c, http.StatusInternalServerError, nil, nil)
		return
	}

	api.RespondJSON(c, http.StatusOK, data, nil)
}

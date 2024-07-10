package controllers

import (
	"fmt"
	"miadok-chaladok/internal/config"
	dbr "miadok-chaladok/internal/database/review"
	"miadok-chaladok/internal/entity/api/request"
	"miadok-chaladok/pkg/api"
	"miadok-chaladok/pkg/api/meta"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

const (
	NO_ERROR                       = iota
	INVALID_PAY_NUMBER_OR_BUY_DATE = iota
)

func AddReviewToProduct(c *gin.Context) {
	var requestData request.AddReviewRequest
	err := c.BindJSON(&requestData)
	if err != nil {
		panic(err)
	}

	fmt.Println(requestData)

	good := true

	if good {
		meta := meta.NewErrorMeta(NO_ERROR, "")
		api.RespondJSON(c, http.StatusOK, nil, meta)
		return
	}
	meta := meta.NewErrorMeta(INVALID_PAY_NUMBER_OR_BUY_DATE, "")
	api.RespondJSON(c, http.StatusBadRequest, nil, meta)
}

func GetReviewsByProductIdPaginated(c *gin.Context) {
	productIdString := c.Query("productId")
	productId, _ := strconv.ParseUint(productIdString, 10, 64)
	pageString := c.Query("page")
	page, _ := strconv.ParseUint(pageString, 10, 64)
	pageSizeString := c.Query("pageSize")
	pageSize, _ := strconv.ParseUint(pageSizeString, 10, 64)

	db := config.GetDb()
	reviews, meta, err := dbr.GetReviewsByProductIdPaginated(db, uint(productId), int(page), int(pageSize))

	if err != nil {
		api.RespondJSON(c, http.StatusNotFound, reviews, meta)
		return
	}
	api.RespondJSON(c, http.StatusOK, reviews, meta)
}

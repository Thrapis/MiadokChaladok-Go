package routes

import (
	"fmt"
	"miadok-chaladok/internal/config"
	dbr "miadok-chaladok/internal/database/review"
	"miadok-chaladok/pkg/api"
	"miadok-chaladok/pkg/api/meta"
	"miadok-chaladok/pkg/util"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

const (
	NO_ERROR                       = iota
	INVALID_PAY_NUMBER_OR_BUY_DATE = iota
)

func AddReviewToProduct(c *gin.Context) {
	type ReviewToProductRequest struct {
		ProductId     uint              `json:"productId"`
		AuthorName    string            `json:"authorName"`
		PaymentNumber string            `json:"paymentNumber"`
		Rating        int16             `json:"raiting"`
		BuyDate       util.FormDateTime `json:"buyDate"`
		Comment       string            `json:"comment"`
	}

	var requestData ReviewToProductRequest
	err := c.BindJSON(&requestData)
	if err != nil {
		panic(err)
	}

	fmt.Println(requestData)

	good := true

	if good {
		meta := meta.NewFormMeta(NO_ERROR)
		api.RespondJSON(c, http.StatusOK, nil, meta)
		return
	}
	meta := meta.NewFormMeta(INVALID_PAY_NUMBER_OR_BUY_DATE)
	api.RespondJSON(c, http.StatusBadRequest, nil, meta)
}

func GetReviewsByProductId(c *gin.Context) {
	productIdString := c.Param("productId")
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

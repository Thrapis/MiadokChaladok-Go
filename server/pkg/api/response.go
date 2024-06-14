package api

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type ResponseData struct {
	Status int
	Data   interface{}
	Meta   interface{}
}

func RespondJSON(c *gin.Context, status int, data interface{}, meta interface{}) {
	fmt.Println("status ", status)
	var res ResponseData

	res.Status = status
	res.Data = data
	res.Meta = meta

	c.JSON(200, res)
}

package api

import (
	"github.com/gin-gonic/gin"
)

type HttpResponse struct {
	Status  int         `json:"status"`
	Payload interface{} `json:"payload"`
	Meta    interface{} `json:"meta"`
}

func RespondJSON(c *gin.Context, status int, payload interface{}, meta interface{}) {
	response := HttpResponse{
		Status:  status,
		Payload: payload,
		Meta:    meta,
	}

	c.JSON(status, response)
}

func AbortRespondJSON(c *gin.Context, status int, payload interface{}, meta interface{}) {
	response := HttpResponse{
		Status:  status,
		Payload: payload,
		Meta:    meta,
	}

	c.AbortWithStatusJSON(status, response)
}

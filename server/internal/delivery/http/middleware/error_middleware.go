package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// ErrorHandleMiddleware - middleware for error handling.
func ErrorHandleMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Next()

		if ctx.Errors != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, ctx.Errors.Last())
		}
	}
}

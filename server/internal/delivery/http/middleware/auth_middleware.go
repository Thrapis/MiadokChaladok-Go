package middleware

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

const tokenKey = "token"

func AuthMiddlewareCookie() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		session := sessions.Default(ctx)

		sessionToken := session.Get(tokenKey)

		if sessionToken == nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "no token",
			})
		}

		ctx.Next()
	}
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte("secretKey"), nil
		})
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			c.Set("userID", claims["userID"])
			c.Next()
		} else {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		}
	}
}

// func AuthMiddleware() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		// Check if the user is authenticated
// 		if isAuthenticated(c) {
// 			c.Next()
// 			return
// 		}
// 		// User is not authenticated, return an error response
// 		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
// 	}
// }

// func isAuthenticated(c *gin.Context) bool {
// 	// Check if the user is authenticated based on a JWT token, session, or any other mechanism
// 	// Return true if the user is authenticated, false otherwise
// 	return false
// }

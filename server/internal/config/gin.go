package config

import (
	"miadok-chaladok/internal/delivery/http/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func NewGin(config *Config) *gin.Engine {
	app := gin.New()

	if !config.DebugMode {
		gin.SetMode(gin.ReleaseMode)
	}
	app.RedirectTrailingSlash = true

	app.Use(gin.Recovery())
	app.Use(gin.Logger())
	app.Use(cors.New(GetCorsConfig(config)))
	app.Use(middleware.ErrorHandleMiddleware())

	return app
}

func GetCorsConfig(config *Config) cors.Config {
	corsConfig := cors.DefaultConfig()
	if len(config.Cors.AllowOrigins) == 0 {
		corsConfig.AllowAllOrigins = true
	} else {
		corsConfig.AllowOrigins = config.Cors.AllowOrigins
	}
	corsConfig.AllowCredentials = true

	return corsConfig
}

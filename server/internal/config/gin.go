package config

import (
	"fmt"
	"miadok-chaladok/internal/delivery/http/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func NewGin(config *Config) *gin.Engine {
	app := gin.New()
	app.Use(gin.Recovery())

	if !config.DebugMode {
		gin.SetMode(gin.ReleaseMode)
	}
	app.RedirectTrailingSlash = true
	app.Use(gin.Logger())
	app.Use(cors.New(GetCorsConfig(config)))
	app.Use(middleware.ErrorHandleMiddleware())

	return app
}

func GetCorsConfig(config *Config) cors.Config {
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{
		fmt.Sprintf("http://%s:%d", config.Web.Host, config.Web.Port),
		fmt.Sprintf("https://%s:%d", config.Web.Host, config.Web.Port),
	}
	corsConfig.AllowCredentials = true

	return corsConfig
}

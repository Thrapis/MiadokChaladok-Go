package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	"miadok-chaladok/internal/config"
	"miadok-chaladok/internal/routes"
)

func main() {
	//fmt.Println(filepath.Abs("configs"))
	//fmt.Println(filepath.Abs("./static"))

	// Getting bot configuration
	cfg := config.GetConfig()
	fmt.Println(cfg)

	// Executing of application workflow
	startServer(cfg)
}

func startServer(cfg *config.Config) {
	// Use Redis as a storage
	// redisCfg := redis.StorageConfig{
	// 	Host:     cfg.Redis.Host,
	// 	Port:     cfg.Redis.Port,
	// 	Password: cfg.Redis.Password,
	// 	Db:       cfg.Redis.Db,
	// }
	// storage, err := redis.New(redisCfg)
	// if err != nil {
	// 	log.Fatalf("Error while instantiating storage. \n%s\n", err)
	// }

	app := gin.Default()
	app.RedirectTrailingSlash = true

	if !cfg.DebugMode {
		gin.SetMode(gin.ReleaseMode)
	}

	app.Use(gin.Logger())
	app.Use(cors.Default())
	app.Use(static.Serve("/static", static.LocalFile("./static", true)))

	//C
	app.POST("/to-cart/product", routes.ProductToCart)
	//R
	app.GET("/product/:id", routes.GetProductById)
	app.GET("/product/suggestions/:limit", routes.GetProductSuggestions)
	app.GET("/product/search/:limit", routes.GetProductsByFilter)

	app.GET("/filter/lists", routes.GetFilterData)
	//U
	//D

	app.Run(":8080")
}

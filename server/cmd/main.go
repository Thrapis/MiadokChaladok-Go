package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	"miadok-chaladok/internal/routes"
)

func main() {
	//fmt.Println(filepath.Abs("configs"))

	startServer()
}

func startServer() {
	app := gin.Default()

	app.Use(gin.Logger())
	app.Use(cors.Default())
	app.Use(static.Serve("/static", static.LocalFile("./static", true)))

	//C
	app.POST("/to-cart/product/", routes.ProductToCart)
	//R
	app.GET("/product/:id", routes.GetProductById)
	app.GET("/product/suggestions/:limit", routes.GetProductSuggestions)
	app.GET("/product/search/:limit", routes.GetProductsByFilter)

	app.GET("/filter/lists", routes.GetFilterData)
	//U
	//D

	app.Run(":8080")
}

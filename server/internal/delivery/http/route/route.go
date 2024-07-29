// Package route provides route configuration and setup.
package route

import (
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

// Config provides route configuration.
type Config struct {
	App               *gin.Engine
	ListsController   IListsController
	ProductController IProductController
	OptionController  IOptionController
	ReviewController  IReviewController
	SessionController ISessionController
	AuthMiddleware    gin.HandlerFunc
}

// Setup - method to setup static, public, private routes.
func (c *Config) Setup() {
	c.setupStaticRoute()
	c.setupPublicRoute()
	c.setupProtectedRoute()
}

func (c *Config) setupStaticRoute() {
	c.App.Use(static.Serve("/static", static.LocalFile("./static", true)))
}

func (c *Config) setupPublicRoute() {
	public := c.App.Group("/api")
	public.Use()
	{
		public.GET("/set-session", c.SessionController.SetSession)

		get := public.Group("/get")
		{
			get.GET("/filter/lists", c.ListsController.GetFilterLists)

			get.GET("/product", c.ProductController.GetProductDescriptionByID)
			get.GET("/products/suggested", c.ProductController.GetSuggestions)
			get.POST("/products/by-filter/paginated", c.ProductController.GetProductsByFilterPaginated)

			get.POST("/cart/items", c.OptionController.GetCartItems)

			get.GET("/reviews/paginated", c.ReviewController.GetReviewsByProductIDPaginated)
		}

		add := public.Group("/add")
		{
			add.POST("/review/to-product", c.ReviewController.AddReviewToProduct)
		}
	}
}

func (c *Config) setupProtectedRoute() {
	protected := c.App.Group("/api")
	protected.Use(c.AuthMiddleware)
}

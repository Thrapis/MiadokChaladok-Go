package route

import (
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

type RouteConfig struct {
	App               *gin.Engine
	ListsController   IListsController
	ProductController IProductController
	OptionController  IOptionController
	ReviewController  IReviewController
	SessionController ISessionController
	AuthMiddleware    gin.HandlerFunc
}

func (c *RouteConfig) Setup() {
	c.SetupStaticRoute()
	c.SetupPublicRoute()
	c.SetupProtectedRoute()
}

func (c *RouteConfig) SetupStaticRoute() {
	c.App.Use(static.Serve("/static", static.LocalFile("./static", true)))
}

func (c *RouteConfig) SetupPublicRoute() {
	public := c.App.Group("/api")
	public.Use()
	{
		public.GET("/set-session", c.SessionController.SetSession)

		get := public.Group("/get")
		{
			get.GET("/filter/lists", c.ListsController.GetFilterLists)

			get.GET("/product", c.ProductController.GetProductDescriptionById)
			get.GET("/products/suggested", c.ProductController.GetSuggestions)
			get.POST("/products/by-filter/paginated", c.ProductController.GetProductsByFilterPaginated)

			get.POST("/cart/items", c.OptionController.GetCartItems)

			get.GET("/reviews/paginated", c.ReviewController.GetReviewsByProductIdPaginated)
		}

		add := public.Group("/add")
		{
			add.POST("/review/to-product", c.ReviewController.AddReviewToProduct)
		}
	}
}

func (c *RouteConfig) SetupProtectedRoute() {
	protected := c.App.Group("/api")
	protected.Use(c.AuthMiddleware)
	{

	}
}

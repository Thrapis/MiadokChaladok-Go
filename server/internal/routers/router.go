package routers

import (
	"miadok-chaladok/internal/config"
	"miadok-chaladok/internal/controllers"
	"miadok-chaladok/internal/middleware"
	"miadok-chaladok/pkg/storage/redis"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func SetupRouter(cfg *config.Config) *gin.Engine {
	// Init router
	router := gin.New()
	router.Use(gin.Recovery())

	// Config router
	if !cfg.DebugMode {
		gin.SetMode(gin.ReleaseMode)
	}
	router.RedirectTrailingSlash = true
	router.Use(gin.Logger())

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:3000"}
	corsConfig.AllowCredentials = true
	router.Use(cors.New(corsConfig))

	store, err := redis.NewStore(redis.StorageConfig(cfg.Redis), 10, []byte(cfg.StoreSecret))
	if err != nil {
		panic(err)
	}

	router.Use(sessions.Sessions("miadok-session", store))

	// Set route to static files
	router.Use(static.Serve("/static", static.LocalFile("./static", true)))

	// Set public routes
	public := router.Group("/api")
	{
		public.GET("/set-session", controllers.SetSession)

		get := public.Group("/get")
		{
			get.GET("/product", controllers.GetProductById)
			get.GET("/products/suggested", controllers.GetSuggestions)
			get.POST("/products/by-filter/paginated", controllers.GetProductsByFilterPaginated)
			get.GET("/reviews/paginated", controllers.GetReviewsByProductIdPaginated)
			get.GET("/filter/lists", controllers.GetFilterLists)
		}
	}

	// Set protected routes
	protected := router.Group("/api")
	protected.Use(middleware.AuthMiddlewareCookie())
	{
		get := protected.Group("/get")
		{
			get.POST("/cart/items", controllers.GetCartItems)
		}

		add := protected.Group("/add")
		{
			add.POST("/review/to-product", controllers.AddReviewToProduct)
		}
	}

	return router
}

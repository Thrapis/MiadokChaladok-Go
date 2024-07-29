package config

import (
	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/delivery/http"
	"miadok-chaladok/internal/delivery/http/route"
	"miadok-chaladok/internal/repository"
	"miadok-chaladok/internal/usecase/lists"
	"miadok-chaladok/internal/usecase/option"
	"miadok-chaladok/internal/usecase/product"
	"miadok-chaladok/internal/usecase/review"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// StartupConfig - web application startup configuration.
type StartupConfig struct {
	Config  *Config
	Log     app.ILogger
	DB      *gorm.DB
	Storage app.IStorage
	App     *gin.Engine
}

// Startup - starting of web application.
func Startup(config *StartupConfig) {
	// setup repositories
	categoryRepository := repository.NewCategoryRepository(config.DB)
	tasteRepository := repository.NewTasteRepository(config.DB)
	shipmentMethodRepository := repository.NewShipmentMethodRepository(config.DB)
	productRepository := repository.NewProductRepository(config.DB)
	optionRepository := repository.NewOptionRepository(config.DB)
	reviewRepository := repository.NewReviewRepository(config.DB)

	// setup use cases
	listsUseCase := lists.NewListsUseCase(config.Storage, config.Log, categoryRepository, tasteRepository, shipmentMethodRepository)
	productCase := product.NewProductUseCase(config.Storage, config.Log, productRepository)
	optionUseCase := option.NewOptionUseCase(config.Storage, config.Log, optionRepository)
	reviewUseCase := review.NewReviewUseCase(config.Storage, config.Log, reviewRepository)

	// setup controllers
	listsController := http.NewListsController(listsUseCase, config.Log)
	productController := http.NewProductController(productCase, config.Log)
	optionController := http.NewOptionController(optionUseCase, config.Log)
	reviewController := http.NewReviewController(reviewUseCase, config.Log)
	sessionController := http.NewSessionController(config.Log)

	routeConfig := route.Config{
		App:               config.App,
		ListsController:   listsController,
		ProductController: productController,
		OptionController:  optionController,
		ReviewController:  reviewController,
		SessionController: sessionController,
	}
	routeConfig.Setup()
}

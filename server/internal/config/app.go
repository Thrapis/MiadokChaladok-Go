package config

import (
	"miadok-chaladok/internal/delivery/http"
	"miadok-chaladok/internal/delivery/http/route"
	"miadok-chaladok/internal/repository"
	"miadok-chaladok/internal/usecase"
	"miadok-chaladok/pkg/storage"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type StartupConfig struct {
	Config  *Config
	Log     *logrus.Logger
	DB      *gorm.DB
	Storage storage.StorageOperator
	App     *gin.Engine
}

func Startup(config *StartupConfig) {
	// setup repositories
	categoryRepository := repository.NewCategoryRepository(config.DB, config.Log)
	tasteRepository := repository.NewTasteRepository(config.DB, config.Log)
	shipmentMethodRepository := repository.NewShipmentMethodRepository(config.DB, config.Log)
	productRepository := repository.NewProductRepository(config.DB, config.Log)
	optionRepository := repository.NewOptionRepository(config.DB, config.Log)
	reviewRepository := repository.NewReviewRepository(config.DB, config.Log)

	// setup use cases
	listsUseCase := usecase.NewListsUseCase(config.DB, config.Storage, config.Log, categoryRepository, tasteRepository, shipmentMethodRepository)
	producteCase := usecase.NewProductUseCase(config.DB, config.Storage, config.Log, productRepository)
	optionUseCase := usecase.NewOptionUseCase(config.DB, config.Storage, config.Log, optionRepository)
	reviewUseCase := usecase.NewReviewUseCase(config.DB, config.Storage, config.Log, reviewRepository)

	// setup controllers
	listsController := http.NewListsController(listsUseCase, config.Log)
	productController := http.NewProductController(producteCase, config.Log)
	optionController := http.NewOptionController(optionUseCase, config.Log)
	reviewController := http.NewReviewController(reviewUseCase, config.Log)
	sessionController := http.NewSessionController(config.Log)

	routeConfig := route.RouteConfig{
		App:               config.App,
		ListsController:   listsController,
		ProductController: productController,
		OptionController:  optionController,
		ReviewController:  reviewController,
		SessionController: sessionController,
	}
	routeConfig.Setup()
}

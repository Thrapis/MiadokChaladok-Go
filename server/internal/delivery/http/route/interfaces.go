package route

import "github.com/gin-gonic/gin"

// IListsController - interface that describes lists controller.
type IListsController interface {
	GetFilterLists(ctx *gin.Context)
}

// IProductController - interface that describes pruduct controller.
type IProductController interface {
	GetProductDescriptionByID(ctx *gin.Context)
	GetProductsByFilterPaginated(ctx *gin.Context)
	GetSuggestions(ctx *gin.Context)
}

// IOptionController - interface that describes option controller.
type IOptionController interface {
	GetCartItems(ctx *gin.Context)
}

// IReviewController - interface that describes review controller.
type IReviewController interface {
	AddReviewToProduct(ctx *gin.Context)
	GetReviewsByProductIDPaginated(ctx *gin.Context)
}

// ISessionController - interface that describes session controller.
type ISessionController interface {
	SetSession(ctx *gin.Context)
}

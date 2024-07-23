package route

import "github.com/gin-gonic/gin"

type IListsController interface {
	GetFilterLists(ctx *gin.Context)
}

type IProductController interface {
	GetProductDescriptionById(ctx *gin.Context)
	GetProductsByFilterPaginated(ctx *gin.Context)
	GetSuggestions(ctx *gin.Context)
}

type IOptionController interface {
	GetCartItems(ctx *gin.Context)
}

type IReviewController interface {
	AddReviewToProduct(ctx *gin.Context)
	GetReviewsByProductIdPaginated(ctx *gin.Context)
}

type ISessionController interface {
	SetSession(ctx *gin.Context)
}

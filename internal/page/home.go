package page

import (
	"miadok-chaladok/internal/database"
	"miadok-chaladok/internal/entity/view"
	"net/http"
)

type homePageData struct {
	Base            BasePageData
	Recommendations []*view.ProductCard
}

const homePageTitle = "Галоўная старонка"
const homePageName = "home"
const homeComponentName = "productCard"
const homeRecommendationsMaxCount = 3

func Home(w http.ResponseWriter, r *http.Request) {
	data := homePageData{
		Base: BasePageData{
			PageName:   homePageName,
			PageTitle:  homePageTitle,
			ShowFooter: true,
			ShowSlider: true,
		},
	}

	products := database.GetRecommendedProducts(homeRecommendationsMaxCount)
	for _, product := range products {
		options := database.GetOptionsOf(product)
		productCard := view.GetProductCard(product, options)
		data.Recommendations = append(data.Recommendations, productCard)
	}

	contentPath := getPagePath(homePageName)
	productCardPath := getComponentPath(homeComponentName)

	executeTotalTemplate(w, data, contentPath, productCardPath)
}

package page

import (
	"miadok-chaladok/internal/entity/view"
	"net/http"
)

type homePageData struct {
	Base            BasePageData
	Recommendations []view.ProductCard
}

func Home(w http.ResponseWriter, r *http.Request) {

	data := homePageData{
		Base: BasePageData{
			PageName:   "home",
			PageTitle:  "Галоўная старонка",
			ShowFooter: true,
			ShowSlider: true,
		},
		Recommendations: getProducts(),
	}

	contentPath := getPagePath("home")
	productCardPath := getComponentPath("productCard")

	executeTotalTemplate(w, data, contentPath, productCardPath)
}

func getProducts() []view.ProductCard {
	prods := make([]view.ProductCard, 0)

	prod1 := view.ProductCard{
		ProductId:   1,
		ProductName: "Рапсавы мёд 1",
		ImagePath:   "/static/images/products/product-1.jpg",
		PriceSpread: "16,00 - 17,00 р",
		OptionList:  make([]view.Option, 0),
	}
	prod1.OptionList = append(prod1.OptionList, view.Option{Name: "100 мл", Price: "16,00 р"})
	prod1.OptionList = append(prod1.OptionList, view.Option{Name: "350 мл", Price: "16,50 р"})
	prod1.OptionList = append(prod1.OptionList, view.Option{Name: "500 мл", Price: "17,00 р"})
	prod1.OptionsCount = len(prod1.OptionList)

	prod2 := view.ProductCard{
		ProductId:   2,
		ProductName: "Рапсавы мёд 2",
		ImagePath:   "/static/images/products/product-2.jpg",
		PriceSpread: "16,00 - 17,00 р",
		OptionList:  make([]view.Option, 0),
	}
	prod2.OptionList = append(prod2.OptionList, view.Option{Name: "450 мл", Price: "16,00 р"})
	prod2.OptionList = append(prod2.OptionList, view.Option{Name: "650 мл", Price: "17,00 р"})
	prod2.OptionsCount = len(prod2.OptionList)

	prod3 := view.ProductCard{
		ProductId:   3,
		ProductName: "Набор “Трыплет”",
		ImagePath:   "/static/images/products/product-set-1.jpg",
		PriceSpread: "30,00 р",
		OptionList:  make([]view.Option, 0),
	}
	prod3.OptionList = append(prod3.OptionList, view.Option{Name: "3 банкі мёду + паштоўка", Price: "30,00 р"})
	prod3.OptionsCount = len(prod3.OptionList)

	prods = append(prods, prod1)
	prods = append(prods, prod2)
	prods = append(prods, prod3)
	return prods
}

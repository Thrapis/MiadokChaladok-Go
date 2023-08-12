package page

import (
	"net/http"
)

type examplePageData struct {
	Base BasePageData
}

func Example(w http.ResponseWriter, r *http.Request) {

	data := examplePageData{
		BasePageData{
			PageName:   "example",
			PageTitle:  "Прыклад",
			ShowFooter: true,
			ShowSlider: false,
		},
	}

	contentPath := getPagePath("example")

	executeTotalTemplate(w, data, contentPath)
}

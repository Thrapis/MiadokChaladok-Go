package page

import (
	"net/http"
)

type aboutPageData struct {
	Base BasePageData
}

func About(w http.ResponseWriter, r *http.Request) {

	data := aboutPageData{
		BasePageData{
			PageName:   "about",
			PageTitle:  "Пра нас",
			ShowFooter: true,
			ShowSlider: false,
		},
	}

	contentPath := getPagePath("about")

	executeTotalTemplate(w, data, contentPath)
}

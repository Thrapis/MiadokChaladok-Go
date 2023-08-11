package page

import (
	"net/http"
)

type notFoundPageData struct {
	Base BasePageData
}

func NotFound(w http.ResponseWriter, r *http.Request) {

	data := notFoundPageData{
		BasePageData{
			PageName:   "notfound",
			PageTitle:  "Памылка 404",
			ShowFooter: false,
			ShowSlider: false,
		},
	}

	contentPath := getPagePath("notfound")

	executeTotalTemplate(w, data, contentPath)
}

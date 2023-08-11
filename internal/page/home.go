package page

import (
	"net/http"
)

type homePageData struct {
	Base BasePageData
}

func Home(w http.ResponseWriter, r *http.Request) {

	data := homePageData{
		BasePageData{
			PageName:   "index",
			PageTitle:  "Галоўная старонка",
			ShowFooter: true,
			ShowSlider: true,
		},
	}

	contentPath := getPagePath("home")

	executeTotalTemplate(w, data, contentPath)
}

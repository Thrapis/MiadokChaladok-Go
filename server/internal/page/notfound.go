package page

import (
	"net/http"
)

const notFoundPageTitle = "Памылка 404"
const notFoundPageName = "notfound"

type notFoundPageData struct {
	Base BasePageData
}

func NotFound(w http.ResponseWriter, r *http.Request) {

	data := notFoundPageData{
		BasePageData{
			PageName:   notFoundPageName,
			PageTitle:  notFoundPageTitle,
			ShowFooter: false,
			ShowSlider: false,
		},
	}

	contentPath := getPagePath(notFoundPageName)

	executeTotalTemplate(w, data, contentPath)
}

package page

import (
	"net/http"
)

type aboutPageData struct {
	Base BasePageData
}

const aboutPageTitle = "Пра нас"
const aboutPageName = "about"

func About(w http.ResponseWriter, r *http.Request) {

	data := aboutPageData{
		BasePageData{
			PageName:   aboutPageName,
			PageTitle:  aboutPageTitle,
			ShowFooter: true,
			ShowSlider: false,
		},
	}

	contentPath := getPagePath(aboutPageName)

	executeTotalTemplate(w, data, contentPath)
}

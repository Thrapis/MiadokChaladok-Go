package page

import (
	"net/http"
)

type examplePageData struct {
	Base BasePageData
}

const examplePageTitle = "Прыклад"
const examplePageName = "example"

func Example(w http.ResponseWriter, r *http.Request) {

	data := examplePageData{
		BasePageData{
			PageName:   examplePageName,
			PageTitle:  examplePageTitle,
			ShowFooter: true,
			ShowSlider: false,
		},
	}

	contentPath := getPagePath(examplePageName)

	executeTotalTemplate(w, data, contentPath)
}

package page

import (
	"fmt"
	"net/http"
	"text/template"
)

type BasePageData struct {
	PageName   string
	PageTitle  string
	ShowSlider bool
	ShowFooter bool
}

const commonTemplateDir = "template"
const pageTemplateDir = "template/page"
const componentTemplateDir = "template/component"

func getCommonPath(templateName string) string {
	return fmt.Sprintf("%s/%s.gohtml", commonTemplateDir, templateName)
}

func getPagePath(templatePageName string) string {
	return fmt.Sprintf("%s/%s.gohtml", pageTemplateDir, templatePageName)
}

func getComponentPath(templatePageName string) string {
	return fmt.Sprintf("%s/%s.gohtml", componentTemplateDir, templatePageName)
}

func executeTotalTemplate(w http.ResponseWriter, data any, templates ...string) {
	basePath := getCommonPath("base")
	headPath := getCommonPath("head")
	sliderPath := getCommonPath("slider")
	headerPath := getCommonPath("header")
	footerPath := getCommonPath("footer")

	totalTemplates := make([]string, 0, 5+len(templates))
	totalTemplates = append(totalTemplates, basePath)
	totalTemplates = append(totalTemplates, headPath)
	totalTemplates = append(totalTemplates, sliderPath)
	totalTemplates = append(totalTemplates, headerPath)
	totalTemplates = append(totalTemplates, footerPath)
	totalTemplates = append(totalTemplates, templates[:]...)

	tmpl := template.Must(template.ParseFiles(totalTemplates[:]...))
	tmpl.Execute(w, data)
}

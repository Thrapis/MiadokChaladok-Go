package main

import (
	"miadok-chaladok/internal/page"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	fileServer := http.FileServer(http.Dir("assets/"))
	router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", fileServer))

	router.NotFoundHandler = http.HandlerFunc(page.NotFound)
	router.HandleFunc("/", page.Home).Methods("GET")
	router.HandleFunc("/about", page.About).Methods("GET")
	router.HandleFunc("/example", page.Example).Methods("GET")

	// r.HandleFunc("/{pageName}", func(w http.ResponseWriter, r *http.Request) {
	// 	page := mux.Vars(r)["pageName"]
	// 	path := fmt.Sprintf("/frontend/%s.html", page)
	// 	fmt.Fprintf(w, path)
	// })

	http.ListenAndServe(":80", router)
}

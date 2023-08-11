package main

import (
	"miadok-chaladok/internal/page"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/", page.Home).Methods("GET")
	router.HandleFunc("/home", page.Home).Methods("GET")
	router.NotFoundHandler = http.HandlerFunc(page.NotFound)

	// r.HandleFunc("/{pageName}", func(w http.ResponseWriter, r *http.Request) {
	// 	page := mux.Vars(r)["pageName"]
	// 	path := fmt.Sprintf("/frontend/%s.html", page)
	// 	fmt.Fprintf(w, path)
	// })

	fileServer := http.FileServer(http.Dir("assets/"))
	router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", fileServer))

	http.ListenAndServe(":80", router)
}

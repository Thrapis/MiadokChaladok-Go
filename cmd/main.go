package main

import (
	"fmt"
	"miadok-chaladok/internal/database"
	"miadok-chaladok/internal/page"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func databaseTest(w http.ResponseWriter, r *http.Request) {
	prods := database.GetProducts()

	for _, v := range prods {
		w.Write([]byte(fmt.Sprintln(v)))
	}
}

func databaseRecommendsTest(w http.ResponseWriter, r *http.Request) {
	maxCount, err := strconv.Atoi(mux.Vars(r)["maxCount"])
	if err != nil {
		w.Write([]byte("invalid 'maxCount' parameter"))
		return
	}

	prods := database.GetRecommendedProducts(maxCount)

	for _, v := range prods {
		w.Write([]byte(fmt.Sprintln(v)))
	}
}

func main() {
	router := mux.NewRouter()

	fileServer := http.FileServer(http.Dir("assets/"))
	router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", fileServer))

	router.NotFoundHandler = http.HandlerFunc(page.NotFound)
	router.HandleFunc("/", page.Home).Methods("GET")
	router.HandleFunc("/about", page.About).Methods("GET")
	router.HandleFunc("/example", page.Example).Methods("GET")
	router.HandleFunc("/test", databaseTest).Methods("GET")
	router.HandleFunc("/test/{maxCount}", databaseRecommendsTest).Methods("GET")

	// r.HandleFunc("/{pageName}", func(w http.ResponseWriter, r *http.Request) {
	// 	page := mux.Vars(r)["pageName"]
	// 	path := fmt.Sprintf("/frontend/%s.html", page)
	// 	fmt.Fprintf(w, path)
	// })

	http.ListenAndServe(":8080", router)
}

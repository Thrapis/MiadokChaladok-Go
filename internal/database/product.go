package database

import (
	"database/sql"
	"miadok-chaladok/internal/entity/data"

	_ "github.com/go-sql-driver/mysql"
)

func GetProducts() []*data.Product {
	db, err := sql.Open("mysql", "command_user:keycode23@tcp(db:3306)/miadok?parseTime=true")

	if err != nil {
		panic(err)
	}

	defer db.Close()

	results, err := db.Query("SELECT * FROM Products")
	if err != nil {
		panic(err)
	}

	var products []*data.Product
	for results.Next() {
		var p data.Product

		err = results.Scan(&p.Id, &p.Name, &p.ImagePath)
		if err != nil {
			panic(err)
		}

		products = append(products, &p)
	}

	return products
}

func GetRecommendedProducts(maxCount int) []*data.Product {
	db, err := sql.Open("mysql", "command_user:keycode23@tcp(db:3306)/miadok?parseTime=true")

	if err != nil {
		panic(err)
	}

	defer db.Close()

	results, err := db.Query(`SELECT p.* FROM Products p
								INNER JOIN Recommendations r ON p.Id = r.ProductId
								LIMIT ?;`, maxCount)

	if err != nil {
		panic(err)
	}

	var products []*data.Product
	for results.Next() {
		var p data.Product

		err = results.Scan(&p.Id, &p.Name, &p.ImagePath)
		if err != nil {
			panic(err)
		}

		products = append(products, &p)
	}

	return products
}

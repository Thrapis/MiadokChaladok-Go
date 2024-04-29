package database

import (
	"database/sql"
	"fmt"
	"miadok-chaladok/internal/entity/data"
	"miadok-chaladok/internal/entity/viewmodel"

	_ "github.com/lib/pq"
)

// PostgreSQL
func GetProductCardById(id int64) *viewmodel.ProductDto {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	defer db.Close()

	results, err := db.Query(`SELECT p.Id, p.Name, p.ImagePath, o.Id, o.Name, o.Price
								FROM Products p INNER JOIN Options o ON p.Id = o.ProductId
								WHERE p.Id = $1`, id)
	if err != nil {
		panic(err)
	}

	var p = &data.Product{}
	var ol = make([]*data.Option, 0)

	for results.Next() {
		var o = &data.Option{}

		err = results.Scan(&p.Id, &p.Name, &p.ImagePath, &o.Id, &o.Name, &o.Price)
		if err != nil {
			panic(err)
		}
		ol = append(ol, o)
	}

	return viewmodel.GetProductCard(p, ol)
}

func GetSuggestedProductCards(maxCount int64) []*viewmodel.ProductDto {
	if maxCount == 0 {
		maxCount = 3
	}

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	defer db.Close()

	results, err := db.Query(`SELECT pr.Id, pr.Name, pr.ImagePath, o.Id, o.Name, o.Price 
								FROM (SELECT p.* FROM Products p 
									INNER JOIN Recommendations r ON p.Id = r.ProductId
									LIMIT $1) pr
								INNER JOIN Options o ON pr.Id = o.ProductId`, maxCount)
	if err != nil {
		panic(err)
	}

	var result = make([]*viewmodel.ProductDto, 0, maxCount)

	var current_p = &data.Product{}
	var current_ol []*data.Option

	for results.Next() {
		var new_p = &data.Product{}
		var new_o = &data.Option{}

		err = results.Scan(&new_p.Id, &new_p.Name, &new_p.ImagePath, &new_o.Id, &new_o.Name, &new_o.Price)
		if err != nil {
			panic(err)
		}

		if current_p.Id != new_p.Id {
			if current_p.Id != 0 {
				result = append(result, viewmodel.GetProductCard(current_p, current_ol))
			}
			current_p = new_p
			current_ol = make([]*data.Option, 0)
		}
		current_ol = append(current_ol, new_o)
	}
	result = append(result, viewmodel.GetProductCard(current_p, current_ol))

	return result
}

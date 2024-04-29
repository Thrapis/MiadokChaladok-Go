package database

import (
	"database/sql"
	"fmt"
	"miadok-chaladok/internal/entity/data"
)

func GetOptionsOf(productId int64) []*data.Option {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	defer db.Close()

	results, err := db.Query(`SELECT o.* FROM Options o
								INNER JOIN Products p ON p.Id = o.ProductId
								WHERE p.Id = ?`, productId)
	if err != nil {
		panic(err)
	}

	var options []*data.Option
	for results.Next() {
		var o data.Option

		err = results.Scan(&o.Id, &o.ProductId, &o.Name, &o.Price)
		if err != nil {
			panic(err)
		}

		options = append(options, &o)
	}

	return options
}

package database

import (
	"database/sql"
	"miadok-chaladok/internal/entity/data"
)

func GetOptionsOf(product *data.Product) []*data.Option {
	db, err := sql.Open("mysql", "command_user:keycode23@tcp(db:3306)/miadok?parseTime=true")

	if err != nil {
		panic(err)
	}

	defer db.Close()

	results, err := db.Query(`SELECT o.* FROM Options o
								INNER JOIN Products p ON p.Id = o.ProductId
								WHERE p.Id = ?`, product.Id)
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

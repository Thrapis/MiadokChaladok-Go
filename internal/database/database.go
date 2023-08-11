package database

import (
	"database/sql"
	"fmt"
	_ "go-sql-driver/mysql"
)

func testDb() {
	// Configure the database connection (always check errors)
	db, err := sql.Open("mysql", "username:password@(127.0.0.1:3306)/dbname?parseTime=true")
	if err != nil {
		fmt.Println(err)
	}

	// Initialize the first connection to the database, to see if everything works correctly.
	// Make sure to check the error.
	err = db.Ping()
	if err != nil {
		fmt.Println(err)
	}

	query := `
			CREATE TABLE users (
				id INT AUTO_INCREMENT,
				username TEXT NOT NULL,
				password TEXT NOT NULL,
				created_at DATETIME,
				PRIMARY KEY (id)
			);`

	// Executes the SQL query in our database. Check err to ensure there was no error.
	_, err = db.Exec(query)
	if err != nil {
		fmt.Println(err)
	}
}

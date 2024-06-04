package database

import (
	"fmt"
	"miadok-chaladok/internal/entity/data"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func GetAllCategories() []*data.Category {
	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := gorm.Open(postgres.Open(dsn), gormConfig)
	if err != nil {
		panic(err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		panic(err)
	}
	defer sqlDB.Close()

	var categories []*data.Category
	db.Limit(-1).Find(&categories)

	return categories
}

package database

import (
	"fmt"
	"miadok-chaladok/internal/entity/data"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func GetAllTastes() []*data.Taste {
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

	var tastes []*data.Taste
	db.Limit(-1).Find(&tastes)

	return tastes
}

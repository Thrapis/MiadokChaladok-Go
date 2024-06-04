package database

import (
	"fmt"
	"miadok-chaladok/internal/entity/data"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func GetAllShipmentMethods() []*data.ShipmentMethod {
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

	var methods []*data.ShipmentMethod
	db.Limit(-1).Find(&methods)

	return methods
}

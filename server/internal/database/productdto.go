package database

import (
	"fmt"
	"miadok-chaladok/internal/entity/data"
	"miadok-chaladok/internal/entity/viewmodel"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func GetProductDtoById(id uint) *viewmodel.ProductDto {
	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := gorm.Open(postgres.Open(dsn), gormConfig)
	if err != nil {
		panic(err)
	}

	sqlDB, err := db.DB()
	defer sqlDB.Close()

	var product data.Product
	db.Preload("Options").First(product, "ID = ?", id)

	dto := viewmodel.ToProductDto(&product)

	return dto
}

func GetProductDtosByFilter(limit int) []*viewmodel.ProductDto {
	if limit == 0 {
		limit = 3
	}

	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := gorm.Open(postgres.Open(dsn), gormConfig)
	if err != nil {
		panic(err)
	}

	sqlDB, err := db.DB()
	defer sqlDB.Close()

	var products []data.Product
	db.Preload("Options").Limit(limit).Find(&products)

	var result = make([]*viewmodel.ProductDto, 0, limit)

	for _, v := range products {
		dto := viewmodel.ToProductDto(&v)
		result = append(result, dto)
	}

	return result
}

func GetSuggestedProductDtos(limit int) []*viewmodel.ProductDto {
	if limit == 0 {
		limit = 3
	}

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

	var products []data.Product
	db.Joins("left join \"Suggestions\" s on s.\"ProductID\" = \"Products\".\"ID\"").
		Preload("Options").Limit(limit).Find(&products)

	var result = make([]*viewmodel.ProductDto, 0, limit)

	for _, v := range products {
		dto := viewmodel.ToProductDto(&v)
		result = append(result, dto)
	}

	return result
}

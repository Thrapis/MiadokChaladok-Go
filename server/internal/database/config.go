package database

import (
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

const (
	driverName = "postgres"
	host       = "localhost"
	port       = 5432
	user       = "miadok_manager"
	password   = "54321"
	dbname     = "miadok_db"
)

var gormConfig = &gorm.Config{
	NamingStrategy: schema.NamingStrategy{
		NoLowerCase: true, // skip the snake_casing of names
		// NameReplacer:  strings.NewReplacer("CID", "Cid"), // use name replacer to change struct/field name before convert it to db name
	},
}

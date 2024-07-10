package config

import (
	"fmt"
	"sync"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

var gormConfig = &gorm.Config{
	// Logger:         logger.Default.LogMode(logger.Info),
	NamingStrategy: schema.NamingStrategy{
		// NoLowerCase: true, // skip the snake_casing of names
		// NameReplacer:  strings.NewReplacer("CID", "Cid"), // use name replacer to change struct/field name before convert it to db name
	},
}

var dbInstance *gorm.DB
var dbOnce sync.Once

func GetDb() *gorm.DB {
	dbOnce.Do(func() {

		cfg := GetConfig()

		dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
			cfg.Database.Host, cfg.Database.Port, cfg.Database.User, cfg.Database.Password, cfg.Database.DbName)

		var err error
		dbInstance, err = gorm.Open(postgres.Open(dsn), gormConfig)
		if err != nil {
			panic(err)
		}
	})

	return dbInstance
}

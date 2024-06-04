package data

import "miadok-chaladok/internal/entity"

type Shop struct {
	entity.GormModel
	Name           string `json:"name"`
	Address        string `json:"address"`
	OpeningHours   string `json:"openingHours"`
	Phone          string `json:"phone"`
	StorageAddress string `json:"storageAddress"`
}

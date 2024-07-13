package entity

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	CustomerName     string
	Email            string
	Phone            string
	PaymentNumber    uuid.UUID
	PaymentDate      time.Time
	Address          string
	Comment          string
	PromoCode        string
	ShipmentMethodID uint
	DeliveryDate     time.Time
}

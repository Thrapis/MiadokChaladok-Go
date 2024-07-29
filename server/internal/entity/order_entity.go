package entity

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Order - entity that represents unit of order.
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

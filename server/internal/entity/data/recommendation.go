package data

type Recommedation struct {
	Id        int64  `json:"id"`
	ProductId int64  `json:"productId"`
	Notes     string `json:"notes"`
}

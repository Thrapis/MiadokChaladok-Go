package data

type Option struct {
	Id        int64   `json:"Id"`
	ProductId int64   `json:"ProductId"`
	Name      string  `json:"Name"`
	Price     float32 `json:"Price"`
}

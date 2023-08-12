package view

type ProductCard struct {
	ProductId    int64
	ProductName  string
	ImagePath    string
	OptionsCount int
	PriceSpread  string
	OptionList   []Option
}

type Option struct {
	Name  string
	Price string
}

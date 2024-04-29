
class Option {
	id: number;
	productId: number;
	name: string;
	price: number;

    constructor(id: number, productId: number, name: string, price: number) {
        this.id = id;
        this.productId = productId;
        this.name = name;
        this.price = price;
    }
}

export { Option }
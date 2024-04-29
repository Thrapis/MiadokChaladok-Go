import { Option } from "entities/Option";

class OptionSelection {
    OptionId: number;
    OptionName: string;
    Price: number;

    constructor(optionId: number, name: string, price: number) {
        this.OptionId = optionId;
        this.OptionName = name;
        this.Price = price;
    }
}

class ProductDto {
    productId: number;
    productName: string;
    imagePath: string;
    priceSpread: string;
    optionList: Option[];

    constructor(id: number, productName: string, imagePath: string,
        priceSpread: string, optionList: Option[]) {
        this.productId = id;
        this.productName = productName;
        this.imagePath = imagePath;
        this.priceSpread = priceSpread;
        this.optionList = optionList;
    }
}

export { ProductDto }
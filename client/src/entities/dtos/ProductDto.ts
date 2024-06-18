import { Option } from "entities/database/Option";

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
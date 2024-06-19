import { Option } from "entities/database/Option";

export type ProductDto = {
    productId: number
    productName: string
    imagePath: string
    priceSpread: string
    optionList: Option[]
}
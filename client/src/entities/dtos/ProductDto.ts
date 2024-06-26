import { Category, Taste, Option, ShipmentMethod, Review, Media } from "entities/database";

export type ProductDto = {
    productId: number
    productName: string
    imagePath: string
    expiration: string
    priceSpread: string
    category: Category
    taste: Taste
    optionList: Option[]
    mediaList: Media[]
    shipmentMethodList: ShipmentMethod[]
    reviewList: Review[]
}
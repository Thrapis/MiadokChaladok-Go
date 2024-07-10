import { Category, Taste, Option, Media, ShipmentMethod, Review } from './'

export type Product = {
	id: number
	categoryId: number
	tasteId: number
    name: string
    imagePath: string
    expiration: string

    category: Category
    taste: Taste
    options: Option[]
    media: Media[]
    shipmentMethods: ShipmentMethod[]
    reviews: Review[]
}
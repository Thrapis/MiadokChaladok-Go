import { ICategory, IShipmentMethod, ITaste } from "../Types"


export interface ICartItemDescription {
    readonly id: number
    readonly name: string
    readonly price: number
    readonly volume: number

    readonly availibility: ICartItemAvilibility[]
    readonly product: ICartItemProductPreview
}

export interface ICartItemAvilibility {
    readonly shopId:    number
	readonly inStock:   number
	readonly inStorage: number
}

export interface ICartItemProductPreview {
    readonly id: number
    readonly name: string
    readonly imagePath: string
    
    readonly category: ICategory
    readonly taste: ITaste
    readonly shipmentMethods: IShipmentMethod[]
}

export {}
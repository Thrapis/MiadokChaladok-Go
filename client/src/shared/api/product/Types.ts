import { ICategory, ITaste, IOption, IMedia, IShipmentMethod} from '../Types'

// Page

export interface IPageProduct {
    readonly id: number
    readonly name: string
    readonly imagePath: string
    readonly expiration: string
    
    readonly category: ICategory
    readonly taste: ITaste
    readonly options: IOption[]
    readonly media: IMedia[]
    readonly shipmentMethods: IShipmentMethod[]
}

// Card

export interface ICardProduct {
    readonly id: number
    readonly name: string
    readonly imagePath: string
    readonly expiration: string
    readonly options: IOption[]
}

// Cart

export interface ICartOption {
    readonly id: number
    readonly name: string
    readonly price: number
    readonly volume: number

    readonly availibility: ICartAvilibility[]
    readonly product: ICartProduct
}

export interface ICartAvilibility {
    readonly shopId:    number
	readonly inStock:   number
	readonly inStorage: number
}

export interface ICartProduct {
    readonly id: number
    readonly name: string
    readonly imagePath: string
    readonly expiration: string
    
    readonly category: ICategory
    readonly taste: ITaste
    readonly shipmentMethods: IShipmentMethod[]
}

export {}
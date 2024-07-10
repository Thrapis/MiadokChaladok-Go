import { ICategory, ITaste, IOption, IMedia, IShipmentMethod} from '../Types'

// Description

export interface IProductOptionAvilibility {
    readonly shopId:    number
	readonly inStock:   number
	readonly inStorage: number
}

export interface IProductOption {
    readonly id: number
    readonly name: string
    readonly price: number
    readonly volume: number
    readonly availibility: IProductOptionAvilibility[]
}

export interface IProductDescription {
    readonly id: number
    readonly name: string
    readonly imagePath: string
    readonly expiration: string
    
    readonly category: ICategory
    readonly taste: ITaste
    readonly options: IProductOption[]
    readonly media: IMedia[]
    readonly shipmentMethods: IShipmentMethod[]
}

// Preview

export interface IProductPreview {
    readonly id: number
    readonly name: string
    readonly imagePath: string
    readonly expiration: string
    readonly options: IOption[]
}

export {}
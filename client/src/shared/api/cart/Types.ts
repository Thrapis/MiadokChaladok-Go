// Cart Item

export interface IOptionItem {
    readonly id: number
    readonly name: string
    readonly price: number
    readonly volume: number
    
    readonly productId: number
    readonly productName: string
    readonly productImagePath: string
    readonly quantityAvailable: number
    readonly shipmentMethods: IOptionItemShipmentMethod[]
}

export interface IOptionItemShipmentMethod {
    readonly id: number
    readonly name: string
}

export interface IGetCartItemsForm {
    readonly optionIds: number[]
}

export {}
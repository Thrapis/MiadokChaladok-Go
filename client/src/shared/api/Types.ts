
export interface IOption {
    readonly id: number
    readonly name: string
    readonly price: number
    readonly volume: number
}

export interface ICategory {
    readonly id: number
	readonly name: string
}

export interface ITaste {
    readonly id: number
	readonly name: string
    readonly description: string
}

export interface IMedia {
    readonly id: number
	readonly productId: number
	readonly imagePath: string
}

export interface IShipmentMethod {
    readonly id: number
	readonly name: string
}

export {}
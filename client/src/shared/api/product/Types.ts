// Description

export interface IProductDescription {
    readonly id: number
    readonly name: string
    readonly imagePath: string
    readonly expiration: string

    readonly isInStock: boolean
    readonly isInStorage: boolean
    readonly categoryName: string
    readonly tasteName: string
    readonly tasteDescription: string
    readonly shipmentMethodNames: string[]
    readonly mediaPaths: string[]
    readonly options: IProductDescriptionOption[]
}

export interface IProductDescriptionOption {
    readonly id: number
    readonly name: string
    readonly price: number
}

// Preview

export interface IProductPreview {
    readonly id: number
    readonly name: string
    readonly imagePath: string
    readonly options: IProductPreviewOption[]
}

export interface IProductPreviewOption {
    readonly id: number
    readonly name: string
    readonly price: number
}

export {}
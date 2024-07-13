// Filter Lists

export interface IFilterLists {
    readonly categories: IFilterRecord[]
    readonly tastes: IFilterRecord[]
    readonly shipmentMethods: IFilterRecord[]
}

export interface IFilterRecord {
    readonly id: number
    readonly name: string
}

export interface IFilterForm {
    readonly ignoreFilters: boolean
    readonly categoryIds: number[]
    readonly tasteIds: number[]
    readonly priceFrom: number
    readonly priceTo: number
    readonly volumeFrom: number
    readonly volumeTo: number
    readonly inShop: boolean
    readonly inStock: boolean
    readonly shipmentMethodIds: number[]
    readonly sortType: number
}

export {}
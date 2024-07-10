import { ICategory, IShipmentMethod, ITaste } from "../Types"

export interface IFilterLists {
    readonly categories: ICategory[]
    readonly tastes: ITaste[]
    readonly shipmentMethods: IShipmentMethod[]
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
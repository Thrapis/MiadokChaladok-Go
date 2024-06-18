export type FilterForm = {
    categoryIds: number[]
    tasteIds: number[]
    priceFrom: number
    priceTo: number
    volumeFrom: number
    volumeTo: number
    inShop: boolean
    inStock: boolean
    shipmentMethodIds: number[]
    sortType: number
}
export type FilterForm = {
    ignoreFilters: boolean
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


// const AmountIsRequired = (value: number) => {
//     return value ? true : 'Патрэбна абраць колькасць абранага прадукта'
// }

export const FilterRuleSet = {
    
}
import { FormatPrice } from "shared/lib/price"

interface IOption {
    readonly id: number
    readonly price: number
}

const OptionPrice = (list: IOption[], id: number) => {
    const option = list.find(o => o.id === id)

    if (option) {
        return FormatPrice(option.price)
    }
    return ""
}

const PriceSpread = (list: IOption[]) => {
    if (list.length === 0) {
        return ""
    }

    const prices = list.map(o => o.price)
    const min = Math.min(...prices)
    const max = Math.max(...prices)

    if (min === max) {
        return `${min}`
    } else {
        return `${FormatPrice(min)} - ${FormatPrice(max)}`
    }
} 

const GetDisplayPrice = (list: IOption[], id?: number) => {
    if (id) {
        return OptionPrice(list, id)
    }
    return PriceSpread(list)
}

export { FormatPrice, OptionPrice, PriceSpread, GetDisplayPrice }
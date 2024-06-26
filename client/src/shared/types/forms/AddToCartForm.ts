export type AddToCartForm = {
    productId: number
    optionId: number
    amount: number
}

const ProductIdIsRequired = (value: number) => {
    return value ? true : 'Патрэбна абраць прадукт для дадання ў кошык'
}

const OptionIdIsRequired = (value: number) => {
    return value ? true : 'Патрэбна абраць опцыю для дадання ў кошык'
}

const AmountIsRequired = (value: number) => {
    return value ? true : 'Патрэбна абраць колькасць абранага прадукта'
}

export const AddToCartRuleSet = {
    ProductIdIsRequired,
    OptionIdIsRequired,
    AmountIsRequired,
}
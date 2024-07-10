
const ProductIdIsRequired = (value: number) => {
    return value ? true : 'Патрэбна абраць прадукт для дадання ў кошык'
}

const AuthorNameIsRequired = (value: string) => {
    return value && value.length > 0 ? true : 'Патрэбна абраць імя, пад якім будзе апублікаваны водгук'
}

const PaymentNumberIsRequired = (value: string) => {
    return value && value.length > 0 ? true : 'Патрэбна дадаць нумар чэка для ідэнтыфікаціі куплі'
}

const RaitingIsRequired = (value: number) => {
    return value ? true : 'Патрэбна абраць ацэнку для водгука'
}

const BuyDateIsRequired = (value: string) => {
    return value && value.length > 0 ? true : 'Патрэбна абраць дату куплі для ідэнтыфікаціі куплі'
}

const RaitingMinMax = (value: number) => {
    return value >= 1 && value <= 5 ? true : 'Ацэнка павінна быць паміж 1 і 5'
}

const CommentLength = (value: string) => {
    return !value || value.length <= 500 ? true : 'Камент павінен быць не болей за 500 сімвалаў'
}

export const AddReviewRuleSet = {
    ProductIdIsRequired,
    AuthorNameIsRequired,
    PaymentNumberIsRequired,
    RaitingIsRequired,
    BuyDateIsRequired,
    RaitingMinMax,
    CommentLength,
}
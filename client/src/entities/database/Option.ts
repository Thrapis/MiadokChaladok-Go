import { OptionsAvailibility } from './'

export type Option = {
	id: number
	productId: number
	name: string
	price: number
	volume: number
	availibility: OptionsAvailibility[]
}
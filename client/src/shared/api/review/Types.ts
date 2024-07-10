
export interface IReviewDescription {
	id: number
	authorName: string
	buyDate: string
	rating: number
	comment: string
}

export interface IAddReviewForm {
    readonly productId: number
    readonly authorName: string
    readonly paymentNumber: string
    readonly raiting: number
    readonly buyDate: string
    readonly comment: string
}

export {}
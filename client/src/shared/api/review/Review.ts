import { AxiosPromise } from "axios"
import { IHttpResponse } from "shared/types"

import { apiInstance } from '../Base'
import { IAddReviewForm, IReviewDescription } from "./Types"

type IGetReviewsByProductIdPaginatedResponse = IHttpResponse<IReviewDescription[]>

export const GetReviewsByProductIdPaginated = (
    productId: number,
    page: number,
    pageSize: number
): AxiosPromise<IGetReviewsByProductIdPaginatedResponse> => {
    return apiInstance.get('/api/get/reviews/paginated', { params: { productId, page, pageSize } })
}

type IAddReviewResponse = IHttpResponse

export const AddReview = (
    form: IAddReviewForm
): AxiosPromise<IAddReviewResponse> => {
    return apiInstance.post('/api/add/review/to-product', form, {
        withCredentials: true,
        validateStatus: (status) => {
            return status >= 200 && status < 500
        },
    })
}

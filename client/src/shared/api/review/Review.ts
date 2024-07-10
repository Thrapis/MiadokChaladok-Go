import { AxiosPromise } from "axios"
import { typesApi, typesForms } from "shared/types"

import { apiInstance } from '../Base'

type HttpResponse = typesApi.HttpResponse
type AddReviewForm = typesForms.AddReviewForm

export const GetReviewsByProductIdPaginated = (productId: number, page: number, pageSize: number): AxiosPromise<HttpResponse> => {
    return apiInstance.get('/api/get/reviews/paginated', { params: { productId, page, pageSize} })
}

export const AddReview = (form: AddReviewForm): AxiosPromise<HttpResponse> => {
    return apiInstance.post('/api/add/review/to-product', form, { withCredentials: true })
}

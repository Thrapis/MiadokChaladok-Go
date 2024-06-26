import axios, { AxiosPromise } from "axios";
import { API_SOURCE } from "shared/config";
import { typesApi, typesForms } from "shared/types";

type ResponseData = typesApi.ResponseData
type AddReviewForm = typesForms.AddReviewForm


export const GetReviewsByProductIdPaginated = (productId: number, page: number, pageSize: number): AxiosPromise<ResponseData> => {
    return axios.get(`${API_SOURCE}/reviews/${productId}?page=${page}&pageSize=${pageSize}`)
}

export const AddReview = (form: AddReviewForm): AxiosPromise<ResponseData> => {
    return axios.post(`${API_SOURCE}/to-product/review`, form)
}

export const ADD_REVIEW_ERROR_MESSAGES: Map<number, string> = new Map([
    [1, "Некаррэктны нумар аплаты ці дата куплі"]
])

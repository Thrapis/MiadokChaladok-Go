import { AxiosPromise } from "axios"
import { typesApi, typesForms } from "shared/types"

import { apiInstance } from '../Base'
import * as type from './Types'

type ResponsePageProduct = typesApi.HttpResponse<type.IPageProduct>

export const GetProductById = (productId: number): AxiosPromise<ResponsePageProduct> => {
    return apiInstance.get('/api/get/product', { params: { productId } })
}

type ResponseCardProducts = typesApi.HttpResponse<type.ICardProduct[]>

export const GetSuggestedProducts = (limit: number): AxiosPromise<ResponseCardProducts> => {
    return apiInstance.get('/api/get/products/suggested', {params: { limit } })
}

type FilterForm = typesForms.FilterForm
type PaginationMeta = typesApi.PaginationMeta
type ResponseCardProductsPaginated = typesApi.HttpResponse<type.ICardProduct[], PaginationMeta>

export const GetProductsByFilterPaginated = (form: FilterForm, page: number, pageSize: number): AxiosPromise<ResponseCardProductsPaginated> => {
    return apiInstance.post('/api/get/products/by-filter/paginated', form, { params: { page, pageSize } })
}

type AddToCartForm = typesForms.AddToCartForm
type HttpResponse = typesApi.HttpResponse

export const AddProductToCart = (form: AddToCartForm): AxiosPromise<HttpResponse> => {
    return apiInstance.post('/api/add/product/to-cart', form, { withCredentials: true })
}


export const GetCart = (): AxiosPromise<HttpResponse> => {
    return apiInstance.get('/api/get/cart', { withCredentials: true })
}

type ResponseCart = typesApi.HttpResponse<type.ICartOption[]>

export const GetCartItems = (optionIds: number[]): AxiosPromise<ResponseCart> => {
    return apiInstance.post('/api/get/cart/items', optionIds, { withCredentials: true })
}
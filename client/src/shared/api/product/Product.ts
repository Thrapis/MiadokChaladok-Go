import { AxiosPromise } from "axios"
import { IHttpResponse } from "shared/types"

import { apiInstance } from '../Base'
import { IProductDescription, IProductPreview } from "./Types"

type IGetProductByIdResponse = IHttpResponse<IProductDescription>

export const GetProductById = (
    productId: number
): AxiosPromise<IGetProductByIdResponse> => {
    return apiInstance.get('/api/get/product', { params: { productId } })
}

type IGetSuggestedProductsResponse = IHttpResponse<IProductPreview[]>

export const GetSuggestedProducts = (
    limit: number
): AxiosPromise<IGetSuggestedProductsResponse> => {
    return apiInstance.get('/api/get/products/suggested', {params: { limit } })
}
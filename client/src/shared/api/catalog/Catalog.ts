import { AxiosPromise } from "axios"
import { IHttpResponse, IPaginationMeta } from "shared/types"

import { apiInstance } from '../Base'
import { IProductPreview } from "../product"
import { IFilterForm, IFilterLists } from "./Types"

type IGetFilterListsResponse = IHttpResponse<IFilterLists>

export const GetFilterLists = (): AxiosPromise<IGetFilterListsResponse> => {
    return apiInstance.get('/api/get/filter/lists')
}

type IGetProductsByFilterPaginatedResponse = IHttpResponse<IProductPreview[], IPaginationMeta>

export const GetProductsByFilterPaginated = (
    form: IFilterForm, 
    page: number, 
    pageSize: number
): AxiosPromise<IGetProductsByFilterPaginatedResponse> => {
    return apiInstance.post('/api/get/products/by-filter/paginated', form, { params: { page, pageSize } })
}
import { AxiosPromise } from "axios"
import { typesApi } from "shared/types"

import { apiInstance } from '../Base'

type HttpResponse = typesApi.HttpResponse

export const GetFilterLists = (): AxiosPromise<HttpResponse> => {
    return apiInstance.get('/api/get/filter/lists')
}
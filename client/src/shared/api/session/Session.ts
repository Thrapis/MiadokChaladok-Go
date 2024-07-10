import { AxiosPromise } from "axios"
import { typesApi } from "shared/types"

import { apiInstance } from '../Base'

type HttpResponse = typesApi.HttpResponse

export const SetSession = (): AxiosPromise<HttpResponse> => {
    return apiInstance.get('/api/set-session', { withCredentials: true })
}
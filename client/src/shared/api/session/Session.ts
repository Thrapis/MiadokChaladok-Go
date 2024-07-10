import { AxiosPromise } from "axios"
import { IHttpResponse } from "shared/types"

import { apiInstance } from '../Base'

export const SetSession = (): AxiosPromise<IHttpResponse> => {
    return apiInstance.get('/api/set-session', { withCredentials: true })
}
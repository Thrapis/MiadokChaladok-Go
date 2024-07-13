import { AxiosPromise } from "axios"
import { IHttpResponse } from "shared/types"

import { apiInstance } from '../Base'

type ISetSession = IHttpResponse

export const SetSession = (): AxiosPromise<ISetSession> => {
    return apiInstance.get('/api/set-session', { withCredentials: true })
}
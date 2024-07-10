import { AxiosPromise } from "axios"
import { IHttpResponse } from "shared/types"
import { apiInstance } from "../Base"
import { ICartItemDescription } from "./Types"

type IGetCartItemsResponse = IHttpResponse<ICartItemDescription[]>

export const GetCartItems = (
    optionIds: number[]
): AxiosPromise<IGetCartItemsResponse> => {
    return apiInstance.post('/api/get/cart/items', optionIds, { withCredentials: true })
}
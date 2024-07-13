import { AxiosPromise } from "axios"
import { IHttpResponse } from "shared/types"
import { apiInstance } from "../Base"
import { IOptionItem, IGetCartItemsForm } from "./Types"



type IGetCartItemsResponse = IHttpResponse<IOptionItem[]>

export const GetCartItems = (
    form: IGetCartItemsForm
): AxiosPromise<IGetCartItemsResponse> => {
    return apiInstance.post('/api/get/cart/items', form, { withCredentials: true })
}
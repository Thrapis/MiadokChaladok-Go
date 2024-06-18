import axios, { AxiosPromise } from "axios";
import { API_SOURCE } from "shared/config";
import { typesApi, typesForms } from "shared/types";

type ResponseData = typesApi.ResponseData
type AddToCartForm = typesForms.AddToCartForm

export const AddProductToCart = (form: AddToCartForm): AxiosPromise<ResponseData> => {
    return axios.post(`${API_SOURCE}/to-cart/product`, form)
}
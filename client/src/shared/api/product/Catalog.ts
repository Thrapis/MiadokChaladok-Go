import axios, { AxiosPromise } from "axios";
import { API_SOURCE } from "shared/config";
import { typesApi, typesForms } from "shared/types";

type ResponseData = typesApi.ResponseData
type FilterForm = typesForms.FilterForm

export const GetCatalogProducts = (page: number, pageSize: number): AxiosPromise<ResponseData> => {
    return axios.get(`${API_SOURCE}/search/products?page=${page}&pageSize=${pageSize}`)
}

export const GetCatalogProductsByFilter = (form: FilterForm, page: number, pageSize: number): AxiosPromise<ResponseData> => {
    // const body = JSON.stringify(data)
    return axios.post(`${API_SOURCE}/search/products?page=${page}&pageSize=${pageSize}`, form)
}
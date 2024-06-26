import axios, { AxiosPromise } from "axios";
import { API_SOURCE } from "shared/config";
import { typesApi, typesForms } from "shared/types";

type ResponseData = typesApi.ResponseData
type FilterForm = typesForms.FilterForm

export const GetCatalogProductsByFilterPaginated = (form: FilterForm, page: number, pageSize: number): AxiosPromise<ResponseData> => {
    return axios.post(`${API_SOURCE}/search/products?page=${page}&pageSize=${pageSize}`, form)
}
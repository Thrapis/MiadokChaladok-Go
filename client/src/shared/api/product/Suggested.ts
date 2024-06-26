import axios, { AxiosPromise } from "axios";
import { API_SOURCE } from "shared/config";
import { typesApi } from "shared/types";

type ResponseData = typesApi.ResponseData

export const GetSuggestedProducts = (limit: number): AxiosPromise<ResponseData> => {
    return axios.get(`${API_SOURCE}/suggestions/${limit}`)
}
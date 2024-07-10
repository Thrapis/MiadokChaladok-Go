
export interface IHttpResponse<P = unknown, M = unknown> {
	status: number
	payload: P
	meta: M
}

export interface IPaginationMeta {
    page: number
    pageSize: number
    totalPages: number
}

export interface IErrorMeta {
    errorCode: number
    errorMessage: string
}

export { }
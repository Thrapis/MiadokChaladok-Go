
export interface IHttpResponse<P = unknown> {
	payload: P
	pagination: IPaginationMeta
    errors: string
}

export interface IPaginationMeta {
    page: number
    pageSize: number
    totalPages: number
}

export { }
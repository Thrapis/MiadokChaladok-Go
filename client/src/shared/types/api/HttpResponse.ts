
export type HttpResponse<P = unknown, M = unknown> = {
	status: number
	payload: P
	meta: M
}

async function request<TResponse>(
    url: string,
    config?: RequestInit
): Promise<TResponse> {
    const response = await fetch(url, config);
    return await response.json();
}

const Api = {
    get: <TResponse>(url: string) =>
        request<TResponse>(url),

    // Using `extends` to set a type constraint:
    post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
        request<TResponse>(url, { method: 'POST', body }),
}

export { Api };

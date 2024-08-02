import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const baseURL = import.meta.env.VITE_API_ENDPOINT;

class HttpRequest {
    private axios: AxiosInstance;

    constructor(baseURL: string) {
        this.axios = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        });
    }

    private async request<T>(
        method: 'get' | 'post' | 'put' | 'delete',
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        try {
            const response = await this.axios.request<T>({
                method,
                url,
                data,
                ...config,
            });
            return response.data;
        } catch (error) {
            console.error(`Error during ${method.toUpperCase()} request to ${url}:`, error);
            throw error;
        }
    }

    public GET<T>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
        const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
        return this.request<T>('get', `${url}${queryString}`, undefined, config);
    }

    public POST<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('post', url, data, config);
    }

    public PUT<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('put', url, data, config);
    }

    public DELETE<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('delete', url, undefined, config);
    }
}

export default new HttpRequest(baseURL);
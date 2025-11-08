import axios, { type AxiosRequestConfig, type AxiosResponse, type Method } from "axios";
import { API_BASEURL } from "../constants/api";

const axiosInstance = axios.create({
    baseURL: API_BASEURL,
    withCredentials: true,
});

export const request = async <T, P = undefined>(method: Method, endpoint: string, payload?: P, params?: object): Promise<{ code: number, data: T }> => {
    const config: AxiosRequestConfig = { method, params };
    if (payload) config.data = payload;

    config.url = endpoint;

    // eslint-disable-next-line no-useless-catch
    try {
        const response: AxiosResponse<T> = await axiosInstance(config);
        return { code: response.status, data: response.data };
    } catch (e: unknown) {
        throw e;
    }
};

export const api = {
    get: <T>(endpoint: string, params?: object) => request<T>("GET", endpoint, undefined, params),
    post: <T, P>(endpoint: string, payload: P) => request<T, P>("POST", endpoint, payload),
};

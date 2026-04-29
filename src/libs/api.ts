import axios, {
    type AxiosRequestConfig,
    type AxiosResponse,
    type Method,
} from "axios";

const axiosInstance = axios.create();

export const setAuthToken = (token: string) => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
    delete axiosInstance.defaults.headers.common["Authorization"];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response?.status === 401 &&
            !error.config.url.includes("/auth")
        ) {
            localStorage.removeItem("admin_token");
            delete axiosInstance.defaults.headers.common["Authorization"];
            window.location.href = "/admin/login";
        }
        return Promise.reject(error);
    },
);

export const request = async <T, P = undefined>(
    method: Method,
    endpoint: string,
    payload?: P,
    params?: object,
): Promise<{ code: number; data: T }> => {
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
    get: <T>(endpoint: string, params?: object) =>
        request<T>("GET", endpoint, undefined, params),
    post: <T, P>(endpoint: string, payload?: P) =>
        request<T, P>("POST", endpoint, payload),
    delete: <T>(endpoint: string, params?: object) =>
        request<T>("DELETE", endpoint, undefined, params),
};

import { AxiosInstance } from "axios";
import { ReduxState, store } from "store";

export const attachTokenInterceptor = (client: AxiosInstance) => {
    client.interceptors.request.use((config) => {
        const state: ReduxState = store.getState();
        const token = state.auth.token;
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
}
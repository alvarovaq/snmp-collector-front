import { AxiosInstance } from "axios";
import { authService } from "services";

export const attachTokenInterceptor = (client: AxiosInstance) => {
    client.interceptors.request.use((config) => {
        const token = authService.getToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
}
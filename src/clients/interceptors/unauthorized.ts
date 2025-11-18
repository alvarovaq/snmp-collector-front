import { AxiosInstance } from "axios";
import { authService } from "services";

export const attachUnauthorizedInterceptor = (client: AxiosInstance) => {
    client.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                authService.logout();
            }
            return Promise.reject(error);
        }
    );
}
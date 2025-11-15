import { AxiosInstance } from "axios";
import { AuthModule, store } from "store";

export const attachUnauthorizedInterceptor = (client: AxiosInstance) => {
    client.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                store.dispatch(AuthModule.logoutAction());
            }
            return Promise.reject(error);
        }
    );
}
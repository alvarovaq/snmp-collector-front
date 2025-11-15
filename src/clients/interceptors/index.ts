import { attachTokenInterceptor } from "./token";
import { AxiosInstance } from "axios";

export const attachInterceptors = (client: AxiosInstance) => {
    attachTokenInterceptor(client);
};
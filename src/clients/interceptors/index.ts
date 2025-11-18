import { AxiosInstance } from "axios";
import { attachTokenInterceptor } from "./token";
import { attachUnauthorizedInterceptor } from "./unauthorized";

export const attachInterceptors = (client: AxiosInstance) => {
    attachTokenInterceptor(client);
    attachUnauthorizedInterceptor(client);
};
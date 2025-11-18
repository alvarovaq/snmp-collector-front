import axios from "axios";
import env from "config/env.config";
import { attachInterceptors } from "./interceptors";

const api = axios.create({
    baseURL: env.apiUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

attachInterceptors(api);

export default api;
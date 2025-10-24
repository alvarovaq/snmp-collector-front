import axios from "axios";
import env from "./env.config";

const api = axios.create({
    baseURL: env.apiUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;
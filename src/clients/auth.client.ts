import api from "./api.client";
import { Credentials } from "../models";

export class AuthClient {
    public static async login(credentials: Credentials): Promise<string> {
        const { data } = await api.post("/auth/login", credentials);
        return data;
    }
};
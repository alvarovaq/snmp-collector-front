import api from "./api.client";
import { User } from "models";

export class UsersClient {
    public static async get(userId: number): Promise<User> {
        const { data } = await api.get("/users/get?id=" + userId);
        return data;
    }
};
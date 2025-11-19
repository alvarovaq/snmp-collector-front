import api from "./api.client";
import { User } from "models";

export class UsersClient {
    public static async get(userId: number): Promise<User> {
        const { data } = await api.get("/users/get?id=" + userId);
        return data;
    }

    public static async getAll(): Promise<User[]> {
        const { data } = await api.get("/users/getAll");
        return data;
    }

    public static async add(user: User): Promise<User> {
        const { data } = await api.post("users/add", user);
        return data;
    }

    public static async update(user: User): Promise<User> {
        const { data } = await api.post("users/update", user);
        return data;
    }

    public static async remove(userId: number): Promise<void> {
        await api.delete("users/remove?id=" + userId);
    }
};
import api from "../config/axios.config";
import { Device } from "../models";

export class DevicesClient {
    public static async getAll(): Promise<Device[]> {
        const { data } = await api.get("/devices/getAll");
        return data;
    }
};
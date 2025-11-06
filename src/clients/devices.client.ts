import api from "../config/axios.config";
import { Device } from "../models";

export class DevicesClient {
    public static async getAll(): Promise<Device[]> {
        const { data } = await api.get("/devices/getAll");
        return data;
    }

    public static async add(device: Device): Promise<Device> {
        const { data } = await api.post("/devices/add", device);
        return data;
    }
};
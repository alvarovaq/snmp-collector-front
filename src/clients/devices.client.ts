import api from "./api.client";
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

    public static async update(device: Device): Promise<Device> {
        const { data } = await api.post("/devices/update", device);
        return data;
    }

    public static async remove(deviceId: number): Promise<void> {
        await api.delete("/devices/remove?id=" + deviceId);
    }
};
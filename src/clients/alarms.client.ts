import api from "./api.client";
import { Alarm } from "../models";

export class AlarmsClient {
    public static async getAll(): Promise<Alarm[]> {
        const { data } = await api.get("/alarms/getAll");
        return data;
    }

    public static async read(alarmId: number): Promise<Alarm> {
        const { data } = await api.get("/alarms/read?id=" + alarmId);
        return data;
    }

    public static async unread(alarmId: number): Promise<Alarm> {
        const { data } = await api.get("/alarms/unread?id=" + alarmId);
        return data;
    }
};
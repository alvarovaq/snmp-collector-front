import api from "./api.client";
import { Alarm } from "../models";

export class AlarmsClient {
    public static async getAll(): Promise<Alarm[]> {
        const { data } = await api.get("/alarms/getAll");
        return data;
    }
};
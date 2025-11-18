import api from "./api.client";
import { OidRecord } from "models";

export class OidRecordsClient {
    public static async getAll(): Promise<OidRecord[]> {
        const { data } = await api.get("oidRecords/getAll");
        return data;
    }
}
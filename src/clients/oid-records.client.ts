import api from "./api.client";
import { OidRecord, OidRecordsReq } from "models";

export class OidRecordsClient {
    public static async getAll(): Promise<OidRecord[]> {
        const { data } = await api.get("oidRecords/getAll");
        return data;
    }

    public static async find(filter: OidRecordsReq): Promise<OidRecord[]> {
        const { data } = await api.post("oidRecords/find", filter);
        return data;
    }
}
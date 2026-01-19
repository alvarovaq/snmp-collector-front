import { Severity } from "models";

export interface AlarmItem {
    id: number;
    rule: string;
    device: string;
    oid: string;
    severity: Severity;
    message: string;
    date: Date;
    readed: boolean;
    value: string;
}
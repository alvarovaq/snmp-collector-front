export interface ReportFilter {
    deviceId: number | null;
    oid: string | null;
    date: Date | null;
    range: number;
}
import { OidRecord } from "models"

export const filterChanges = (records: OidRecord[]): OidRecord[] => {
    const results: OidRecord[] = [];

    var lastRecord: OidRecord | null = null;
    for (const record of records) {
        if (lastRecord === null || lastRecord.value !== record.value || lastRecord.error !== record.error || lastRecord.type !== record.type)
            results.push(record);
        lastRecord = record;
    }

    return results;
}
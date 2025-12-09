import { Point } from "../models";

export const compressByInterval = (points: Point[], intervalSeconds: number): Point[] => {
    if (points.length === 0) return [];

    const intervalMs = intervalSeconds * 1000;
    const sorted = [...points].sort((a, b) => a.date.getTime() - b.date.getTime());

    const result: Point[] = [];
    let currentIntervalStart = sorted[0].date.getTime();
    result.push(sorted[0]);

    for (const p of sorted) {
        const t = p.date.getTime();
        if (t - currentIntervalStart >= intervalMs) {
            result.push(p);
            currentIntervalStart = t;
        }
    }

    return result;
}

export const calculateIntervalSeconds = (startDate: Date, endDate: Date, maxPoints: number): number => {
    const diffMs = endDate.getTime() - startDate.getTime();
    if (diffMs <= 0) return 1;

    const intervalSeconds = diffMs / 1000 / maxPoints;
    
    return Math.max(1, Math.floor(intervalSeconds));
}
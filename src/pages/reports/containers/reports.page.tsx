import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ReportFilter, Device, OidRecord, OidRecordsReq } from "models";
import { OidRecordsClient } from "clients";
import { GraphComponent, ReportFilterComponent, RecordTableComponent, ViewReportButton } from "../components";
import { ReduxState } from "store";
import { ViewReport } from "../models";
import { useNotification } from "context";
import { Box } from "@mui/material";

const selectDevices = (state: ReduxState): Device[] => state.devices;
const selectReportFilter = (state: ReduxState): ReportFilter => state.reports;

export const ReportsPage = () => {
    const [records, setRecords] = useState<OidRecord[]>([]);
    const [start, setStart] = useState<Date>(new Date());
    const [end, setEnd] = useState<Date>(new Date());
    const [interval, setInterval] = useState<number>(60);
    const [view, setView] = useState<ViewReport>(ViewReport.Table);

    const devices: Device[] = useSelector(selectDevices);
    const filters: ReportFilter = useSelector(selectReportFilter);
    const { notify } = useNotification();

    const updateInterval = (deviceId: number, oid: string): void => {
        const freq = devices.find(d => d.id === deviceId)?.oids.find(o => o.oid === oid)?.frequency;
        if (freq)
            setInterval(freq);
    };

    const getRecords = (deviceId: number, oid: string, start: Date, end: Date): void => {
        const filter: OidRecordsReq = { deviceId, oid, start, end };
        OidRecordsClient.find(filter)
            .then((data) => {
                return data.map(d => {
                    return { ...d, date: new Date(d.date) };
                });
            })
            .then((data) => {
                setRecords(data);
                setStart(start);
                setEnd(end);

                updateInterval(deviceId, oid);
            })
            .catch((error) => {
                console.log("Error al obtener el historico de registros", error);
            });
    };

    const onSearch = (filter: ReportFilter): void => {
        if (filter.deviceId === null || filter.oid === null) {
            notify("Selecciona un OID", "error");
            return;
        }

        const end = filter.date !== null ? filter.date : new Date();
        const start = new Date(end.getTime() - filter.range * 1000);

        getRecords(filter.deviceId, filter.oid, start, end);
    };

    const handleViewChange = (_: React.MouseEvent<HTMLElement>, nextView: ViewReport | null) => {
        if (nextView !== null) setView(nextView);
    };

    return (
        <Box sx={{ padding: 2, display: "flex", flexDirection: "column", height: "100%" }}>
            <ReportFilterComponent devices={devices} onSearch={onSearch} filters={filters} />

            <ViewReportButton view={view} handleViewChange={handleViewChange} />

            <Box sx={{ flex: 1, minHeight: 0 }}>
                {view === ViewReport.Graph ? (
                    <GraphComponent records={records} start={start} end={end} interval={interval} />
                ) : (
                    <RecordTableComponent records={records} />
                )}
            </Box>
        </Box>
    );
};

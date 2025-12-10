import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Device, OidRecord, OidRecordsReq } from "models";
import { OidRecordsClient } from "clients";
import { GraphComponent, ReportFilterComponent, RecordTableComponent } from "../components";
import { ReduxState } from "store";
import { ReportFilter } from "../models";
import { useNotification } from "context";
import { ToggleButton, ToggleButtonGroup, Box, Tooltip, Typography } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import TableChartIcon from "@mui/icons-material/TableChart";

const selectDevices = (state: ReduxState): Device[] => state.devices;

export const ReportsPage = () => {
    const [records, setRecords] = useState<OidRecord[]>([]);
    const [start, setStart] = useState<Date>(new Date(2024, 11, 31, 22, 0, 0));
    const [end, setEnd] = useState<Date>(new Date(2025, 0, 1, 2, 0, 0));
    const [view, setView] = useState<"graph" | "table">("graph");

    const devices: Device[] = useSelector(selectDevices);
    const { notify } = useNotification();

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

    const handleViewChange = (_: React.MouseEvent<HTMLElement>, nextView: "graph" | "table" | null) => {
        if (nextView !== null) setView(nextView);
    };

    return (
        <div style={{ padding: "16px" }}>
            <ReportFilterComponent devices={devices} onSearch={onSearch} />

            <Box mb={2}>
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={handleViewChange}
                    size="small"
                    sx={{
                        mb: 2,
                        "& .MuiToggleButton-root": {
                            minWidth: 120,
                            display: "flex",
                            justifyContent: "center",
                            gap: 0.5
                        },
                    }}
                >
                    <Tooltip title="Gráfica">
                        <ToggleButton value="graph">
                            <BarChartIcon sx={{ mr: 0.5 }} />
                            <Typography variant="body2" >Gráfica</Typography>
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Tabla">
                        <ToggleButton value="table">
                            <TableChartIcon sx={{ mr: 0.5 }} />
                            <Typography variant="body2" >Tabla</Typography>
                        </ToggleButton>
                    </Tooltip>
                </ToggleButtonGroup>
            </Box>

            {view === "graph" ? (
                <GraphComponent records={records} start={start} end={end} />
            ) : (
                <RecordTableComponent records={records} />
            )}
        </div>
    );
};

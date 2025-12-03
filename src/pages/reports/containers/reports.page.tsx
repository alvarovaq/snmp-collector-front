import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Device, OidRecord, OidRecordsReq } from "models";
import { OidRecordsClient } from "clients";
import { GraphComponent, ReportFilterComponent } from "../components";
import { ReduxState } from "store";
import { ReportFilter } from "../models";
import { useNotification } from "context";

const selectDevices = (state: ReduxState): Device[] => state.devices;

export const ReportsPage = () => {
    const [records, setRecords] = useState<OidRecord[]>([]);
    const [start, setStart] = useState<Date>(new Date(2024, 11, 31, 22, 0, 0));
    const [end, setEnd] = useState<Date>(new Date(2025, 0, 1, 2, 0, 0));
  
	const devices: Device[] = useSelector(selectDevices);

    const { notify } = useNotification();

    const getRecords = (deviceId: number, oid: string, start: Date, end: Date): void => {
        const filter: OidRecordsReq = { deviceId, oid, start, end };  
        OidRecordsClient.find(filter)
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
        const start = new Date(end.getTime() - 60 * 60 * 1000);
        getRecords(filter.deviceId, filter.oid, start, end);
    };
    
    return (
        <div style={{ padding: "16px" }}>
          	<ReportFilterComponent devices={devices} onSearch={onSearch} />
			<GraphComponent records={records} start={start} end={end} />
		</div>
    );
};

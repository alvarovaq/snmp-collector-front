import React, { useEffect, useState } from "react";
import { OidRecord, OidRecordsReq } from "models";
import { OidRecordsClient } from "clients";
import { GraphComponent } from "../components";

export const ReportsPage = () => {
    const [records, setRecords] = useState<OidRecord[]>([]);
  
    useEffect(() => {
        const filter: OidRecordsReq = {
            deviceId: 34,
            oid: "1.1.1.1.1.1.1.1.1",
            start: new Date(2025, 0, 1, 0, 0, 0),
            end: new Date(2025, 0, 2, 0, 0, 0)
        };  
        OidRecordsClient.find(filter)
        .then((data) => {
            setRecords(data);
        })
        .catch((error) => {
          console.log("Error al obtener el historico de registros", error);
        });
    }, []);
    
    return (
      <GraphComponent records={records} />
    );
};

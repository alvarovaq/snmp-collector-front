import { useState } from "react";
import { Button, MenuItem, Stack, Select, InputLabel, FormControl, } from "@mui/material";
import { Device, OidConfig } from "models";
import { ReportFilter } from "../models";

export interface ReportFilterComponentProps {
    devices: Device[],
    onSearch: (filter: ReportFilter) => void;
}

export const ReportFilterComponent = (props: ReportFilterComponentProps) => {
    const [deviceId, setDeviceId] = useState<number | null>(null);
    const [oid, setOid] = useState<string | null>(null);
    
    const handleSearch = (): void => {
        const filter: ReportFilter = {
            deviceId,
            oid
        };
        props.onSearch(filter);
    };

    const onSelectDevice = (deviceId: number): void => {
        setDeviceId(deviceId);
        setOid(null);
    };

    const oids: OidConfig[] = props.devices.find(d => d.id === deviceId)?.oids ?? [];

    return (
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              	<InputLabel id="device-label">Dispositivo</InputLabel>
              	<Select
					labelId="device-label"
					value={deviceId}
					label="Dispositivo"
					onChange={(e) => onSelectDevice(Number(e.target.value))}
				>
                    {
                        props.devices.map(d => {
                            return (
                                <MenuItem value={d.id}>{d.name}</MenuItem>
                            );
                        })
                    }
				</Select>
			</FormControl>
				
			<FormControl size="small" sx={{ minWidth: 180 }}>
				<InputLabel id="oid-label">OID</InputLabel>
				<Select
					labelId="oid-label"
					value={oid}
					label="OID"
					onChange={(e) => setOid(e.target.value)}
				>
                    {
                        oids.map(o => {
                            return (
                                <MenuItem value={o.oid}>{o.name}</MenuItem>
                            );
                        })
                    }
				</Select>
			</FormControl>
				
			<Button variant="contained" onClick={handleSearch}>
				Consultar
			</Button>
        </Stack>
    );
};
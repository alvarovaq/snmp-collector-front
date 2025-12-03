import { useState } from "react";
import { Button, MenuItem, Stack, Select, InputLabel, FormControl } from "@mui/material";
import { Device, OidConfig } from "models";
import { ReportFilter } from "../models";
import { DateShiftPicker } from "./date-shift-picker";
import { DurationPicker } from "./duration-picker";

export interface ReportFilterComponentProps {
    devices: Device[];
    onSearch: (filter: ReportFilter) => void;
}

export const ReportFilterComponent = (props: ReportFilterComponentProps) => {
    const [deviceId, setDeviceId] = useState<number | null>(null);
    const [oid, setOid] = useState<string | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [range, setRange] = useState<number>(15 * 60);

    const handleSearch = (): void => {
        const filter: ReportFilter = {
            deviceId,
            oid,
            date,
            range
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
                    value={deviceId ?? ""}
                    label="Dispositivo"
                    onChange={(e) => onSelectDevice(Number(e.target.value))}
                >
                    {props.devices.map(d => (
                        <MenuItem key={d.id} value={d.id}>
                            {d.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel id="oid-label">OID</InputLabel>
                <Select
                    labelId="oid-label"
                    value={oid ?? ""}
                    label="OID"
                    onChange={(e) => setOid(e.target.value)}
                >
                    {oids.map(o => (
                        <MenuItem key={o.oid} value={o.oid}>
                            {o.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <DateShiftPicker
                value={date}
                onChange={setDate}
                step={range * 1000}
                label="Fecha fin"
            />

            <DurationPicker
                value={range}
                onChange={setRange}
                label="Rango"
            />

            <Button variant="contained" onClick={handleSearch}>
                Consultar
            </Button>
        </Stack>
    );
};

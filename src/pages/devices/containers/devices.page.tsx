import { useSelector } from "react-redux";
import { Device, OidRecord } from "models";
import { ReduxState } from "store";
import { DeviceTableComponent } from "../components";
import { DeviceItem, Status } from "../models";
import { Box, Typography, Paper } from "@mui/material";

const selectDevices = (state: ReduxState): Device[] => state.devices;
const selectRecords = (state: ReduxState): OidRecord[] => state.oidRecords;

export const DevicePage = () => {
  const devices: Device[] = useSelector(selectDevices);
  const records: OidRecord[] = useSelector(selectRecords);
  
  const onSelectDevice = (device: DeviceItem): void => {
    console.log("Dispositivo pulsado: ", device.id);
  };

  const getStatus = (deviceId: number) : Status => {
    const latestRecord = records.filter((r) => r.deviceId === deviceId).reduce((prev, current) => (current.date > prev.date ? current : prev));
    if (latestRecord) {
      if (latestRecord.value) {
        return Status.Connected;
      } else {
        return Status.Disconnected;
      }
    } else {
      return Status.Disconnected;
    }
  };

  const items = devices.map((device) => {
    return { ...device, status: getStatus(device.id) };
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dispositivos SNMP
      </Typography>

      <Paper sx={{ p: 2, width: "100%" }}>
        <DeviceTableComponent devices={items} onSelectDevice={onSelectDevice} onCreate={() => {}} onUpdate={() => {}} onDelete={() => {}} />
      </Paper>
    </Box>
  );
};
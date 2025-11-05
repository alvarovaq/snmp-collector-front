import { useState } from "react";
import { useSelector } from "react-redux";
import { Device, OidRecord } from "models";
import { ReduxState } from "store";
import { DeviceTableComponent, OidsDeviceComponent } from "../components";
import { DeviceItem, Status } from "../models";
import { Box, Typography, Paper } from "@mui/material";

const selectDevices = (state: ReduxState): Device[] => state.devices;
const selectRecords = (state: ReduxState): OidRecord[] => state.oidRecords;

export const DevicePage = () => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceItem | null>(null);

  const devices: Device[] = useSelector(selectDevices);
  const records: OidRecord[] = useSelector(selectRecords);
  
  const onSelectDevice = (device: DeviceItem): void => {
    setSelectedDevice(device);
  };

  const getStatus = (deviceId: number) : Status => {
    const deviceRecords = records.filter((r) => r.deviceId === deviceId);
    if (!deviceRecords.length)
      return Status.Disconnected;

    const latestRecord = deviceRecords.reduce((prev, current) => (current.date > prev.date ? current : prev));
    if (!latestRecord)
      return Status.Disconnected;

    return latestRecord.value ? Status.Connected : Status.Disconnected;
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

      {selectedDevice && (
        <Box sx={{ mt: 3 }}>
          <OidsDeviceComponent device={selectedDevice} records={records} />
        </Box>
      )}
    </Box>
  );
};
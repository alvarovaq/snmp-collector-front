import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Device, OidRecord } from "models";
import { DevicesModule, ReduxState } from "store";
import { DeviceTableComponent, OidsDeviceComponent, DeviceDialog, RmDeviceDialog } from "../components";
import { Status } from "../models";
import { Box, Typography, Paper } from "@mui/material";
import { DevicesClient } from "clients";

const selectDevices = (state: ReduxState): Device[] => state.devices;
const selectRecords = (state: ReduxState): OidRecord[] => state.oidRecords;

export const DevicePage = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [openDeviceDlg, setOpenDeviceDlg] = useState<boolean>(false);
  const [editDevice, setEditDevice] = useState<Device | null>(null);
  const [openRmDeviceDlg, setOpenRmDeviceDlg] = useState<boolean>(false);
  const [rmDevice, setRmDevice] = useState<Device | null>(null);

  const devices: Device[] = useSelector(selectDevices);
  const records: OidRecord[] = useSelector(selectRecords);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedDevice) {
      const device = devices.find((d) => d.id === selectedDevice.id);
      if (device) {
        setSelectedDevice(device);
      } else {
        setSelectedDevice(null);
      }
    }
  }, [devices]);
  
  const onSelectDevice = (device: Device): void => {
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

  const onCreateDevice = (): void => {
    setEditDevice(null);
    setOpenDeviceDlg(true);
  };

  const onEditDevice = (device: Device): void => {
    setEditDevice(device);
    setOpenDeviceDlg(true);
  };

  const onCloseDeviceDlg = (): void => {
    setOpenDeviceDlg(false);
  };

  const addDevice = async (device: Device): Promise<void> => {
    try {
      const newDevice = await DevicesClient.add(device);
      dispatch(DevicesModule.addAction(newDevice));
    } catch (error) {
      console.error("Error al crear dispositivo", error);
    }
  };

  const updateDevice = async (device: Device): Promise<void> => {
    try {
      const updDevice = await DevicesClient.update(device);
      dispatch(DevicesModule.addAction(updDevice));
    } catch (error) {
      console.error("Error al actualizar dispositivo", error);
    }
  };

  const removeDevice = async (deviceId: number): Promise<void> => {
    try {
      await DevicesClient.remove(deviceId);
    } catch (error) {
      console.error("Error al eliminar dispositivo", error);
    }
  };

  const onSaveDevice = (device: Device): void => {
    if (!editDevice) {
      addDevice(device);
    } else {
      updateDevice(device);
    }
    setOpenDeviceDlg(false);
  };

  const onRemoveDevice = (device: Device): void => {
    setRmDevice(device);
    setOpenRmDeviceDlg(true);
  };

  const onCancelRmDevice = (): void => {
    setOpenRmDeviceDlg(false);
  };

  const onConfirmRmDevice = (): void => {
    if (rmDevice) {
      removeDevice(rmDevice.id);
    }
    setOpenRmDeviceDlg(false);
  };

  const items = devices.map((device) => {
    return { ...device, status: getStatus(device.id) };
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", pb: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dispositivos SNMP
      </Typography>

      <Paper sx={{ p: 2, width: "100%" }}>
        <DeviceTableComponent devices={items} onSelectDevice={onSelectDevice} onCreate={onCreateDevice} onUpdate={onEditDevice} onDelete={onRemoveDevice} />
      </Paper>

      {selectedDevice && (
        <Box sx={{ mt: 3 }}>
          <OidsDeviceComponent device={selectedDevice} records={records} />
        </Box>
      )}

      <DeviceDialog open={openDeviceDlg} onClose={onCloseDeviceDlg} onSave={onSaveDevice} device={editDevice} />
      <RmDeviceDialog open={openRmDeviceDlg} onCancel={onCancelRmDevice} onConfirm={onConfirmRmDevice} device={rmDevice?.name || "-"} />
    </Box>
  );
};
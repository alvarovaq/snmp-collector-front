import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Device, OidRecord, Rule } from "models";
import { DevicesModule, ReduxState } from "store";
import { DeviceTableComponent, OidsDeviceComponent, DeviceDialog } from "../components";
import { Status } from "../models";
import { Box, Typography } from "@mui/material";
import { DevicesClient } from "clients";
import { useNotification } from "context";
import { selectIsAdmin } from "store/selectors";
import { ConfirmDlg } from "components";

const selectDevices = (state: ReduxState): Device[] => state.devices;
const selectRecords = (state: ReduxState): OidRecord[] => state.oidRecords;
const selectRules = (state: ReduxState): Rule[] => state.rules;

export const DevicePage = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [openDeviceDlg, setOpenDeviceDlg] = useState<boolean>(false);
  const [editDevice, setEditDevice] = useState<Device | null>(null);
  const [openRmDeviceDlg, setOpenRmDeviceDlg] = useState<boolean>(false);
  const [rmDevice, setRmDevice] = useState<Device | null>(null);

  const devices: Device[] = useSelector(selectDevices);
  const records: OidRecord[] = useSelector(selectRecords);
  const rules: Rule[] = useSelector(selectRules);

  const { notify } = useNotification();

  const dispatch = useDispatch();

  const isAdmin = useSelector(selectIsAdmin);

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
      notify("Dispositivo creado correctamente", "success");
    } catch (error) {
      notify("Error al crear el dispositivo", "error");
      console.error("Error al crear dispositivo", error);
    }
  };

  const updateDevice = async (device: Device): Promise<void> => {
    try {
      const updDevice = await DevicesClient.update(device);
      dispatch(DevicesModule.addAction(updDevice));
      notify("Dispositivo actualizado correctamente", "success");
    } catch (error) {
      notify("Error al actualizar el dispositivo", "error");
      console.error("Error al actualizar dispositivo", error);
    }
  };

  const removeDevice = async (deviceId: number): Promise<void> => {
    try {
      await DevicesClient.remove(deviceId);
      notify("Dispositivo eliminado correctamente", "success");
    } catch (error) {
      notify("Error al eliminar el dispositivo", "error");
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
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", py: 4, px: 2 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dispositivos SNMP
      </Typography>

      <DeviceTableComponent devices={items} onSelectDevice={onSelectDevice} onCreate={onCreateDevice} onUpdate={onEditDevice} onDelete={onRemoveDevice} permission={isAdmin} />

      {selectedDevice && (
        <Box sx={{ mt: 3 }}>
          <OidsDeviceComponent device={selectedDevice} records={records} />
        </Box>
      )}

      <DeviceDialog open={openDeviceDlg} onClose={onCloseDeviceDlg} onSave={onSaveDevice} device={editDevice} rules={rules} />
      <ConfirmDlg open={openRmDeviceDlg} title={"Eliminar dispositivo"} onCancel={onCancelRmDevice} onConfirm={onConfirmRmDevice} >
        <Typography sx={{ mb: 2 }}>
            ¿Estás seguro de querer eliminar el dispositivo{" "}
            <Typography component="span" color="secondary">
                {rmDevice?.name || "-"}
            </Typography>
            ?
        </Typography>
      </ConfirmDlg>
    </Box>
  );
};
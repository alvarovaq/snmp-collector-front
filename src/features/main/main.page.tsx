import { useEffect, useState } from "react";
import { Device, OidRecord } from "models";
import { DevicesModule, ReduxState } from "store";
import { DevicesClient } from "clients/devices.client";
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow, Box, Divider, Chip, Tooltip, } from "@mui/material";
import { OidRecordsClient } from "clients/oid-records.client";
import { useDispatch, useSelector } from "react-redux";

const selectDevices = (state: ReduxState): Device[] => state.devices;

export const MainPage = () => {
  const [records, setRecords] = useState<OidRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const devices: Device[] = useSelector(selectDevices);
  
  useEffect(() => {
    const loadDevices = async (): Promise<void> => {
      try {
        const devices = await DevicesClient.getAll();
        dispatch(DevicesModule.setAction(devices));
      } catch (error) {
        console.log("Error al cargar dispositivos: ", error);
      } finally {
        setLoading(false);
      }
    };

    const loadRecords = async (): Promise<void> => {
      try {
        const records = await OidRecordsClient.getAll();
        setRecords(records);
      } catch (error) {
        console.log("Error al cargar dispositivos: ", error);
      }
    };

    loadDevices();
    loadRecords();
  }, [dispatch]);

  const getRecordForOid = (deviceId: number, oid: string): OidRecord | undefined => {
    return records.find((record) => record.deviceId === deviceId && record.oid === oid);
  };

  if (loading) return <p>Cargando dispositivos...</p>

  if (devices.length === 0) return <Typography>No hay dispositivos configurados.</Typography>

  return (
    <Grid container spacing={3}>
      {devices.map((device) => (
        <Grid key={device.id}>
          <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {device.name}
              </Typography>

              <Box mb={1}>
                <Typography variant="body2" color="text.secondary">
                  <strong>IP:</strong> {device.config.ip}:{device.config.port}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Versión SNMP:</strong> {device.config.version}
                </Typography>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle2" gutterBottom>
                OIDs y valores actuales:
              </Typography>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>OID</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell align="right">Frecuencia</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {device.oids.map((oid) => {
                    const record = getRecordForOid(device.id, oid.oid);
                    const displayValue = record
                      ? record.error
                        ? `⚠️ ${record.error}`
                        : record.value ?? "-"
                      : "-";

                    return (
                      <TableRow key={oid.oid}>
                        <TableCell>
                          <Tooltip title={oid.oid}>
                            <span>{oid.name}</span>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          {oid.oid}
                        </TableCell>
                        <TableCell>
                          {record?.error ? (
                            <Chip label="Error" color="error" size="small" />
                          ) : (
                            <Typography
                              variant="body2"
                              color={record ? "text.primary" : "text.disabled"}
                            >
                              {displayValue}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="right">{oid.frequency}s</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
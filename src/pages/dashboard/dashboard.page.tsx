import { Device, OidRecord } from "models";
import { ReduxState } from "store";
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow, Box, Divider, Chip, Tooltip, } from "@mui/material";
import { useSelector } from "react-redux";

const selectDevices = (state: ReduxState): Device[] => state.devices;
const selectOidRecords = (state: ReduxState): OidRecord[] => state.oidRecords;

export const DashboardPage = () => {
const devices: Device[] = useSelector(selectDevices);
  const records: OidRecord[] = useSelector(selectOidRecords);
  
  const getRecordForOid = (deviceId: number, oid: string): OidRecord | undefined => {
    return records.find((record) => record.deviceId === deviceId && record.oid === oid);
  };

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
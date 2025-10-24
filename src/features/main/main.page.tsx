import { useEffect, useState } from "react";
import { Device } from "models";
import { DevicesClient } from "clients/devices.client";
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow, Box, Divider, } from "@mui/material";

export const MainPage = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadDevices();
    }, []);

    const loadDevices = async () => {
        try {
            const devices = await DevicesClient.getAll();
            setDevices(devices);
        } catch (error) {
            console.log("Error al cargar dispositivos: ", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p>Cargando dispositivos...</p>

    if (devices.length === 0) {
    return <Typography>No hay dispositivos configurados.</Typography>;
  }

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
                OIDs configurados:
              </Typography>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>OID</TableCell>
                    <TableCell align="right">Frecuencia</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {device.oids.map((oid) => (
                    <TableRow key={oid.oid}>
                      <TableCell>{oid.name}</TableCell>
                      <TableCell>{oid.oid}</TableCell>
                      <TableCell align="right">{oid.frequency}s</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
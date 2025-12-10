import { Box, Typography, Chip, Paper } from "@mui/material";
import { Device, OidRecord, SnmpObjType } from "models";
import { getOidTypeColor } from "utils/oid-records";

interface Props {
  device: Device;
  records: OidRecord[];
}

export const OidsDeviceComponent = ({ device, records }: Props) => {

  const getLatestRecord = (oid: string): OidRecord | undefined => {
    const oidRecords = records.filter((r) => r.deviceId === device.id && r.oid === oid);
    if (!oidRecords.length) return undefined;

    return oidRecords.reduce((prev, curr) =>
      curr.date > prev.date ? curr : prev
    );
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        OIDs de{" "}
        <Typography component="span" variant="h6" color="secondary" fontWeight="bold">
          {device.name}
        </Typography>
      </Typography>
      
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          fontWeight: "bold",
          borderBottom: "2px solid rgba(0,0,0,0.3)",
          pb: 1,
          mb: 1,
          mx: 1,
        }}
      >
        <Typography sx={{ width: "25%" }}>Nombre</Typography>
        <Typography sx={{ width: "25%" }}>OID</Typography>
        <Typography sx={{ width: "25%", textAlign: "center" }}>Valor</Typography>
        <Typography sx={{ width: "25%", textAlign: "right" }}>Tipo</Typography>
      </Box>
      
      {device.oids.map((oid) => {
        const latest = getLatestRecord(oid.oid);

        const value = latest?.error
          ? latest.error
          : latest?.value ?? "Sin datos";

        const type = latest?.type ?? SnmpObjType.Null;
        const chipColor = getOidTypeColor(type);

        return (
          <Box
            key={oid.oid}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              p: 1,
              borderBottom: "1px solid rgba(0,0,0,0.1)"
            }}
          >
            <Typography sx={{ width: "25%", fontWeight: 500 }}>
              {oid.name}
            </Typography>
            
            <Typography
              variant="body2"
              sx={{ width: "25%", fontFamily: "monospace", opacity: 0.7 }}
            >
              {oid.oid}
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                width: "25%",
                textAlign: "center",
                fontFamily: "monospace"
              }}
            >
                {value}
            </Typography>
            
            <Box
              sx={{
                width: "25%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", width: "fit-content" }}>
                <Chip
                  label={type}
                  sx={{
                    textTransform: "none",
                    backgroundColor: chipColor
                  }}
                />
              </Box>
            </Box>
          </Box>
        );
      })}
    </Paper>
  );
};
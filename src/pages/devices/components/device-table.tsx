import React, { useState, useMemo } from "react";
import { Box, TextField, IconButton, Tooltip, Button, Chip, } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { DeviceItem, Status } from "../models";

interface DeviceTableComponentProps {
  devices: DeviceItem[];
  onSelectDevice: (device: DeviceItem) => void;
  onCreate: () => void;
  onUpdate: (device: DeviceItem) => void;
  onDelete: (device: DeviceItem) => void;
}

export const DeviceTableComponent = (props: DeviceTableComponentProps) => {
  const [search, setSearch] = useState("");
  
  const filteredDevices = useMemo(
    () =>
      props.devices.filter((d) =>
        [d.name, d.config.ip]
          .some((field) =>
            field.toLowerCase().includes(search.toLowerCase())
          )
      ),
    [props.devices, search]
  );

  const columns: GridColDef<DeviceItem>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 2
    },
    {
      field: "ip",
      headerName: "IP",
      flex: 2,
      valueGetter: (_, row) => row.config.ip,
    },
    {
      field: "port",
      headerName: "Puerto",
      flex: 1,
      valueGetter: (_, row) => row.config.port,
    },
    {
      field: "version",
      headerName: "Versión SNMP",
      flex: 1,
      valueGetter: (_, row) => row.config.version,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      filterable: false,
      sortable: false,
      renderCell: ({ row }) => {
        const statusMap: Record<Status, { label: string; color: any }> = {
          [Status.Connected]: { label: "Conectado", color: "success" },
          [Status.Disconnected]: { label: "No Conectado", color: "error" }
        };

        const { label, color } = statusMap[row.status];

        return (
          <Chip
            label={label}
            color={color}
            size="small"
            variant={"filled"}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar">
            <IconButton onClick={() => props.onUpdate(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton onClick={() => props.onDelete(params.row)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <TextField
          label="Buscar..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 200 }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={props.onCreate}
        >
          Crear dispositivo
        </Button>
      </Box>

      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid<DeviceItem>
          rows={filteredDevices}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          onRowClick={(params: GridRowParams<DeviceItem>) =>
            props.onSelectDevice(params.row)
          }
          sx={{
            cursor: "pointer",
            "& .MuiDataGrid-row:hover": { backgroundColor: "action.hover" },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          disableColumnResize
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}

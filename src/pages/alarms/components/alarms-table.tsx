import { Box, Chip, } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import { GetSeverityColor, GetSeverityText } from "utils/rules";
import { AlarmItem } from "../models";

interface AlarmsTableComponentProps {
  items: AlarmItem[];
}

export const AlarmsTableComponent = (props: AlarmsTableComponentProps) => {
  const columns: GridColDef<AlarmItem>[] = [
    {
      field: "device",
      headerName: "Dispositivo",
      flex: 2
    },
    {
      field: "oid",
      headerName: "OID",
      flex: 2
    },
    {
        field: "rule",
        headerName: "Regla",
        flex: 2
    },
    {
        field: "message",
        headerName: "Causa",
        flex: 2
    },
    {
        field: "value",
        headerName: "Valor actual",
        flex: 2
    },
    {
        field: "date",
        headerName: "Fecha",
        flex: 2,
        valueGetter: (_, row) => row.date.toLocaleString("es-ES", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
        })
    },
    {
      field: "severity",
      headerName: "Severidad",
      flex: 1,
      filterable: false,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <Chip
            label={GetSeverityText(row.severity)}
            sx={{
              textTransform: "none",
              backgroundColor: GetSeverityColor(row.severity)
            }}
            size="small"
            variant={"filled"}
          />
        );
      },
    }
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid<AlarmItem>
                rows={props.items}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10, page: 0 } },
                }}
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
  );
}

import React, { useState, useMemo } from "react";
import { Box, TextField, IconButton, Tooltip, Button, Chip, } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Rule } from "models";
import { GetSeverityColor, GetSeverityText, GetOperatorText } from "utils/rules";

interface RulesTableComponentProps {
  rules: Rule[];
  permission: boolean;
  onSelectRule: (rule: Rule) => void;
  onCreate: () => void;
  onUpdate: (rule: Rule) => void;
  onDelete: (rule: Rule) => void;
}

export const RulesTableComponent = (props: RulesTableComponentProps) => {
  const [search, setSearch] = useState("");
  
  const filteredRules = useMemo(
    () =>
      props.rules.filter((r) =>
        [r.name]
          .some((field) =>
            field.toLowerCase().includes(search.toLowerCase())
          )
      ),
    [props.rules, search]
  );

  const columns: GridColDef<Rule>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 2
    },
    {
      field: "operator",
      headerName: "Operacion",
      flex: 2,
      valueGetter: (v) => GetOperatorText(v)
    },
    {
        field: "threshold",
        headerName: "Límite",
        flex: 2
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
            <IconButton onClick={() => props.onUpdate(params.row)} disabled={!props.permission} >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton onClick={() => props.onDelete(params.row)} disabled={!props.permission} >
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
          disabled={!props.permission}
        >
          Crear regla
        </Button>
      </Box>

      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid<Rule>
          rows={filteredRules}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          onRowClick={(params: GridRowParams<Rule>) =>
            props.onSelectRule(params.row)
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

import React, { useState, useMemo } from "react";
import { Box, TextField, IconButton, Tooltip, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Role, User } from "models";

interface UsersTableComponentProps {
  users: User[];
  onSelectUser: (user: User) => void;
  onCreate: () => void;
  onUpdate: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UsersTableComponent = (props: UsersTableComponentProps) => {
  const [search, setSearch] = useState("");
  
  const filteredUsers = useMemo(
    () =>
      props.users.filter((u) =>
        [u.name, u.email, u.role]
          .some((field) =>
            field.toLowerCase().includes(search.toLowerCase())
          )
      ),
    [props.users, search]
  );

  const getRoleText = (role: Role): string => {
    if (role === Role.ADMIN) {
        return "Administrador";
    } else if (role === Role.VIEWER) {
        return "Visualizador";
    } else {
        return "";
    }
  };

  const columns: GridColDef<User>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 2
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      valueGetter: (_, row) => row.email,
    },
    {
      field: "role",
      headerName: "Rol",
      flex: 1,
      valueGetter: (_, row) => getRoleText(row.role),
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
            <IconButton onClick={() => props.onUpdate(params.row)} >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton onClick={() => props.onDelete(params.row)} >
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
        <DataGrid<User>
          rows={filteredUsers}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          onRowClick={(params: GridRowParams<User>) =>
            props.onSelectUser(params.row)
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

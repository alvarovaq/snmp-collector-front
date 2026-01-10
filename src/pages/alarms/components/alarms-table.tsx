import { Box, Chip, Tooltip, IconButton, FormControlLabel, Switch, } from "@mui/material";
import { DataGrid, GridColDef, GridPagination } from "@mui/x-data-grid";
import MarkunreadIcon from '@mui/icons-material/Markunread';
import DraftsIcon from '@mui/icons-material/Drafts';
import { esES } from "@mui/x-data-grid/locales";
import { GetSeverityColor, GetSeverityText } from "utils/rules";
import { AlarmItem } from "../models";
import { useMemo, useState } from "react";

interface CustomFooterProps {
	showOnlyChanges: boolean;
	onToggle: () => void;
}

const CustomFooter = (props: CustomFooterProps) => {
  return (
		<Box 
			sx={{ 
				display: "flex", 
				justifyContent: "space-between", 
				alignItems: "center",
				px: 2,
				py: 1
			}}
		>
			<FormControlLabel
				control={
					<Switch 
						checked={props.showOnlyChanges}
						onChange={props.onToggle}
					/>
				}
				label="Mostrar solo alertas sin leer"
			/>
			
			<GridPagination />
		</Box>
    );
}

interface AlarmsTableComponentProps {
	items: AlarmItem[];
	onRead: (alarmId: number, readed: boolean) => void;
}

export const AlarmsTableComponent = (props: AlarmsTableComponentProps) => {
	const [showOnlyUnreaded, setShowOnlyUnreaded] = useState<boolean>(false);
	
	const filteredAlarms = useMemo(() => {
		return (showOnlyUnreaded ? props.items.filter(i => !i.readed) : props.items);
	}, [props.items, showOnlyUnreaded]);
	
	const columns: GridColDef<AlarmItem>[] = [
		{
			field: "actions",
			headerName: "",
			width: 40,
			sortable: false,
			filterable: false,
			renderCell: (params) => (
				<Tooltip title={ params.row.readed ? "Marcar como no leída" : "Marcar como leída" }>
				<IconButton onClick={() => props.onRead(params.row.id, !params.row.readed)} >
					{ params.row.readed ? <DraftsIcon /> : <MarkunreadIcon /> }
				</IconButton>
				</Tooltip>
			),
		},
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
                rows={filteredAlarms}
                columns={columns}
                getRowClassName={(params) => params.row.readed ? "alarm-read" : ""}
                pageSizeOptions={[5, 10, 20]}
                initialState={{
					pagination: { paginationModel: { pageSize: 10, page: 0 } },
                }}
                sx={{
                    cursor: "pointer",
                    "& .MuiDataGrid-row:hover": { backgroundColor: "action.hover" },
                    "& .MuiDataGrid-row.alarm-read": {
						opacity: 0.6,
                    },
                    "& .MuiDataGrid-row.alarm-read:hover": {
						backgroundColor: "action.selected",
                    },
                    "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
						outline: "none",
                    },
                }}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                disableColumnResize
                disableRowSelectionOnClick
                slots={{
                  	footer: () => (
						<CustomFooter
							showOnlyChanges={showOnlyUnreaded}
							onToggle={() => setShowOnlyUnreaded((v) => !v)}
						/>
					)
                }}
            />
        </Box>
  	);
}

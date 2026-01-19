import React, { useMemo, useState } from "react";
import { Box, Chip, FormControlLabel, Switch, } from "@mui/material";
import { DataGrid, GridColDef, GridPagination } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import { OidRecord } from "models";
import { getOidTypeColor } from "utils/oid-records";
import { filterChanges } from "../utils/record-table";

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
				label="Mostrar solo variaciones"
			/>
			
			<GridPagination />
		</Box>
    );
}

interface RecordTableComponentProps {
  	records: OidRecord[];
}

export const RecordTableComponent = (props: RecordTableComponentProps) => {  
	const [ showOnlyChanges, setShowOnlyChanges ] = useState<boolean>(false);
	const filteredDevices = useMemo(() => {
		return showOnlyChanges ? filterChanges(props.records) : props.records;
	}, [props.records, showOnlyChanges]);

	const columns: GridColDef<OidRecord>[] = [
		{
			field: "date",
			headerName: "Fecha",
			flex: 1,
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
			field: "value",
			headerName: "Valor",
			flex: 1,
			valueGetter: (_, row) => row.value ? row.value : row.error,
		},
		{
			field: "type",
			headerName: "Tipo",
			flex: 1,
			renderCell: ({ row }) => {
				return (
					<Chip
						label={row.type}
						size="medium"
						variant={"filled"}
						sx={{
							backgroundColor: getOidTypeColor(row.type)
						}}
					/>
				);
			},
		},
	];

	return (
		<Box sx={{ flex: 1, height: "100%", width: "100%" }}>
			<DataGrid<OidRecord>
				rows={filteredDevices}
				columns={columns}
				getRowId={(row) => `${row.date}`}
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
				slots={{
					footer: () => (
						<CustomFooter
							showOnlyChanges={showOnlyChanges}
							onToggle={() => setShowOnlyChanges((v) => !v)}
						/>
					)
				}}
				autoPageSize
			/>
		</Box>
	);
}

import { ToggleButton, ToggleButtonGroup, Box, Tooltip, Typography } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import { ViewReport } from "../models";

interface ViewReportButtonProps {
    view: ViewReport;
    handleViewChange: (_: React.MouseEvent<HTMLElement>, nextView: ViewReport | null) => void;
}

export const ViewReportButton = (props: ViewReportButtonProps) => {
    return (
        <Box mb={2} >
            <ToggleButtonGroup
                value={props.view}
                exclusive
                onChange={props.handleViewChange}
                size="small"
                sx={{
                    mb: 2,
                    "& .MuiToggleButton-root": {
                        minWidth: 120,
                        display: "flex",
                        justifyContent: "center",
                        gap: 0.5
                    },
                }}
            >
                <Tooltip title="Tabla">
                    <ToggleButton value={ViewReport.Table}>
                        <TableChartIcon sx={{ mr: 0.5 }} />
                        <Typography variant="body2" >Tabla</Typography>
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="Gráfica">
                    <ToggleButton value={ViewReport.Graph}>
                        <BarChartIcon sx={{ mr: 0.5 }} />
                        <Typography variant="body2" >Gráfica</Typography>
                    </ToggleButton>
                </Tooltip>
            </ToggleButtonGroup>
        </Box>
    );
};
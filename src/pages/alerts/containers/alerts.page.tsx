import { Rule } from "models";
import { useSelector } from "react-redux";
import { Typography, Box, } from "@mui/material";
import { ReduxState } from "store";
import { RulesTableComponent } from "../components";

const selectRules = (state: ReduxState): Rule[] => state.rules;

export const AlertsPage = () => {
    const rules = useSelector(selectRules);
    
    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", py: 4, px: 2 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
                Reglas
            </Typography>

            <RulesTableComponent rules={rules} permission={true} onSelectRule={(rule: Rule) => {}} onCreate={() => {}} onUpdate={(rule: Rule) => {}} onDelete={(rule: Rule) => {}} />
        </Box>
    );
};
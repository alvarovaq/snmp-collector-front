import { Rule } from "models";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, } from "@mui/material";
import { ReduxState, RulesModule } from "store";
import { RulesTableComponent, RuleDialog } from "../components";
import { useState } from "react";
import { useNotification } from "context";
import { RulesClient } from "clients/rules.client";

const selectRules = (state: ReduxState): Rule[] => state.rules;

export const AlertsPage = () => {
    const [openRuleDialog, setOpenRuleDialog] = useState<boolean>(false);

    const rules = useSelector(selectRules);

    const { notify } = useNotification();
    const dispatch = useDispatch();

    const addRule = async (rule: Rule): Promise<void> => {
        try {
            const newRule = await RulesClient.add(rule);
            dispatch(RulesModule.addAction(newRule));
            notify("Regla creada correctamente", "success");
        } catch (error) {
            notify("Error al crear la regla", "error");
            console.error("Error al crear regla", error);
        }
    };

    const onSaveRuleDialog = (rule: Rule) => {
        addRule(rule);
        setOpenRuleDialog(false);
    };
    
    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", py: 4, px: 2 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
                Reglas
            </Typography>

            <RulesTableComponent rules={rules} permission={true} onSelectRule={(rule: Rule) => {}} onCreate={() => { setOpenRuleDialog(true); }} onUpdate={(rule: Rule) => {}} onDelete={(rule: Rule) => {}} />

            <RuleDialog open={openRuleDialog} onSave={onSaveRuleDialog} onClose={() => { setOpenRuleDialog(false); }} />
        </Box>
    );
};
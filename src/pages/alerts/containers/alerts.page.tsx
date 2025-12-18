import { Rule } from "models";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, } from "@mui/material";
import { ReduxState, RulesModule } from "store";
import { RulesTableComponent, RuleDialog } from "../components";
import { useState } from "react";
import { useNotification } from "context";
import { RulesClient } from "clients/rules.client";

const selectRules = (state: ReduxState): Rule[] => state.rules;

interface RuleDlgStatus {
    open: boolean;
    rule: Rule | null; 
}

export const AlertsPage = () => {
    const [ruleDlgStatus, setRuleDlgStatus] = useState<RuleDlgStatus>({ open: false, rule: null });

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

    const editRule = async (rule: Rule): Promise<void> => {
        try {
            const updRule = await RulesClient.update(rule);
            dispatch(RulesModule.addAction(updRule));
            notify("Regla editada correctamente", "success");
        } catch (error) {
            notify("Error al editar la regla", "error");
            console.error("Error al editar regla", error);
        }
    };

    const onSaveRuleDialog = (rule: Rule): void => {
        if (rule.id !== -1)
            editRule(rule);
        else
            addRule(rule);
        setRuleDlgStatus({ ...ruleDlgStatus, open: false });
    };

    const onCloseRuleDialog = (): void => {
        setRuleDlgStatus({ ...ruleDlgStatus, open: false });
    };

    const onAddRule = (): void => {
        setRuleDlgStatus({ open: true, rule: null });
    };

    const onEditRule = (rule: Rule): void => {
        setRuleDlgStatus({ open: true, rule: rule });
    };
    
    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", py: 4, px: 2 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
                Reglas
            </Typography>

            <RulesTableComponent rules={rules} permission={true} onSelectRule={(rule: Rule) => {}} onCreate={onAddRule} onUpdate={onEditRule} onDelete={(rule: Rule) => {}} />

            <RuleDialog open={ruleDlgStatus.open} onSave={onSaveRuleDialog} onClose={onCloseRuleDialog} rule={ruleDlgStatus.rule} />
        </Box>
    );
};
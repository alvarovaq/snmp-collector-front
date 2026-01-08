import { Alarm, Device, OidRecord, Rule } from "models";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, } from "@mui/material";
import { ReduxState, RulesModule } from "store";
import { RulesTableComponent, RuleDialog, AlarmsTableComponent } from "../components";
import { useMemo, useState } from "react";
import { useNotification } from "context";
import { RulesClient } from "clients/rules.client";
import { ConfirmDlg } from "components";
import { AlarmItem } from "../models";

const selectRules = (state: ReduxState): Rule[] => state.rules;
const selectAlarms = (state: ReduxState): Alarm[] => state.alarms;
const selectDevices = (state: ReduxState): Device[] => state.devices;
const selectOidRecords = (state: ReduxState): OidRecord[] => state.oidRecords;

interface RuleDlgState {
    open: boolean;
    rule: Rule | null; 
}

interface RmRuleState {
    open: boolean;
    rule: Rule | null;
}

export const AlarmsPage = () => {
    const [ruleDlgState, setRuleDlgState] = useState<RuleDlgState>({ open: false, rule: null });
    const [rmRuleState, setRmRuleState] = useState<RmRuleState>({ open: false, rule: null });

    const rules = useSelector(selectRules);
    const alarms = useSelector(selectAlarms);
    const devices = useSelector(selectDevices);
    const oidRecords = useSelector(selectOidRecords);

    const { notify } = useNotification();
    const dispatch = useDispatch();

    const alarmsItems = useMemo(
        () =>
          alarms.map(a => {
            const device = devices.find(d => d.id === a.deviceId);
            const oid = device?.oids.find(o => o.oid === a.oid);
            const rule = rules.find(r => r.id === a.ruleId);
            const oidRecord = oidRecords.find(o => o.deviceId === a.deviceId && o.oid === a.oid);
            return {
                id: a.id,
                device: device?.name ?? "",
                oid: oid?.name ?? "",
                rule: rule?.name ?? "",
                date: a.date,
                message: a.message,
                severity: a.severity,
                readed: a.readed,
                value: oidRecord?.value ?? "",
            } as AlarmItem
          }),
        [devices, alarms, rules, oidRecords]
      );

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

    const removeRule = async (ruleId: number): Promise<void> => {
        try {
            await RulesClient.remove(ruleId);
            dispatch(RulesModule.removeAction(ruleId));
            notify("Regla eliminada correctamente", "success");
        } catch (error) {
            notify("Error al eliminar la regla", "error");
            console.error("Error al eliminar regla", error);
        }
    };

    const onAddRule = (): void => {
        setRuleDlgState({ open: true, rule: null });
    };

    const onEditRule = (rule: Rule): void => {
        setRuleDlgState({ open: true, rule: rule });
    };

    const onRemoveRule = (rule: Rule): void => {
        setRmRuleState({ open: true, rule: rule });
    };

    const onSaveRuleDialog = (rule: Rule): void => {
        if (rule.id !== -1)
            editRule(rule);
        else
            addRule(rule);
        setRuleDlgState({ ...ruleDlgState, open: false });
    };

    const onCloseRuleDialog = (): void => {
        setRuleDlgState({ ...ruleDlgState, open: false });
    };

    const onConfirmRmRule = (): void => {
        removeRule(rmRuleState.rule?.id || -1);
        setRmRuleState({ ...rmRuleState, open: false });
    };

    const onCloseRmRule = (): void => {
        setRmRuleState({ ...rmRuleState, open: false });
    };
    
    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", py: 4, px: 2 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
                Alertas
            </Typography>

            <AlarmsTableComponent items={alarmsItems} />
            
            <Typography variant="h5" sx={{ my: 4 }}>
                Reglas
            </Typography>

            <RulesTableComponent rules={rules} permission={true} onSelectRule={(rule: Rule) => {}} onCreate={onAddRule} onUpdate={onEditRule} onDelete={onRemoveRule} />

            <RuleDialog open={ruleDlgState.open} onSave={onSaveRuleDialog} onClose={onCloseRuleDialog} rule={ruleDlgState.rule} />
            <ConfirmDlg open={rmRuleState.open} title={"Eliminar regla"} onCancel={onCloseRmRule} onConfirm={onConfirmRmRule} >
                <Typography sx={{ mb: 2 }}>
                    ¿Estás seguro de querer eliminar la regla{" "}
                    <Typography component="span" color="secondary">
                        {rmRuleState.rule?.name || "-"}
                    </Typography>
                    ?
                </Typography>
            </ConfirmDlg>
        </Box>
    );
};
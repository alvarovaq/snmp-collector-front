import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, MenuItem, } from "@mui/material";
import { Operator, Rule, Severity } from "models";
import { GetOperatorText, GetSeverityText, OperatorRequiresNumber } from "utils/rules";

interface RuleDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (rule: Rule) => void;
    rule: Rule | null;
}

export const RuleDialog = (props: RuleDialogProps) => {
    const [name, setName] = useState<string>("");
    const [severity, setSeverity] = useState<Severity>(Severity.INFO);
    const [operator, setOperator] = useState<Operator>(Operator.EQUAL);
    const [threshold, setThreshold] = useState<string>("");

    useEffect(() => {
        if (props.open) {
            if (props.rule !== null) {
                setName(props.rule.name);
                setSeverity(props.rule.severity);
                setOperator(props.rule.operator);
                setThreshold(props.rule.threshold);
            } else {
                setName("");
                setSeverity(Severity.INFO);
                setOperator(Operator.EQUAL);
                setThreshold("");
            }
        }
    }, [props.open]);

    const checkForm = (): boolean => {
        if (name.length === 0)
            return false;

        if (OperatorRequiresNumber(operator) && isNaN(Number(threshold)))
            return false;

        return true;
    };

    const save = () => {
        const rule: Rule = {
            id: props.rule !== null ? props.rule.id : -1,
            name: name,
            operator: operator,
            severity: severity,
            threshold: threshold
        };
         
        props.onSave(rule);
    };

    const severityOptions = Object.values(Severity);
    const operatorOptions = Object.values(Operator);

    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="xs">
            <DialogTitle>{ props.rule === null ? "Crear regla" : "Editar regla" }</DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid size={12} >
                        <TextField
                            label="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid size={12} >
                        <TextField
                            label="Severidad"
                            select
                            value={severity}
                            onChange={(e) => setSeverity(e.target.value as Severity)}
                            fullWidth
                        >
                            {
                                severityOptions.map(sev => {
                                    return (
                                        <MenuItem value={sev}>{GetSeverityText(sev)}</MenuItem>
                                    );
                                })
                            }
                        </TextField>
                    </Grid>

                    <Grid size={12} >
                        <TextField
                            label="Operación"
                            select
                            value={operator}
                            onChange={(e) => setOperator(e.target.value as Operator)}
                            fullWidth
                        >
                            {
                                operatorOptions.map(op => {
                                    return (
                                        <MenuItem value={op}>{GetOperatorText(op)}</MenuItem>
                                    );
                                })
                            }
                        </TextField>
                    </Grid>

                    <Grid size={12} >
                        <TextField
                            label="Límite"
                            value={threshold}
                            onChange={(e) => setThreshold(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={props.onClose}>Cancelar</Button>
                <Button variant="contained" onClick={save} disabled={!checkForm()}>
                    {"Guardar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
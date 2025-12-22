import { Grid, TextField, IconButton, Button, } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { OidConfig, Rule } from "models";
import { RulesInput } from "./rules-input";

interface OidsFormProps {
    oids: OidConfig[];
    rules: Rule[];
    onChange: (oids: OidConfig[]) => void;
}

export const OidsForm = (props: OidsFormProps) => {
    
    const updateOid = (index: number, field: string, value: any): void => {
        const updated = [...props.oids];
        updated[index] = { ...updated[index], [field]: value };
        props.onChange(updated);
    };

	const updateRules = (index: number, values: number[]): void => {
		const updated = [...props.oids];
		updated[index] = { ...updated[index], rules: [...values] };
		props.onChange(updated);
	};

    const removeOid = (index: number) => {
        const updated = [...props.oids];
        updated.splice(index, 1);
        props.onChange(updated);
    };

    const addOid = (): void => {
        props.onChange([...props.oids, { name: "", oid: "", frequency: 30, rules: [] }]);
    };

    return (
        <Grid container spacing={2} sx={{width: "100%"}} >
            <Grid container spacing={1} sx={{ width: "100%" }} >
                {props.oids.map((oidItem, index) => (
                    <Grid key={index} container sx={{ width: "100%" }} >
                        <Grid size={3}>
                            <TextField
                                label="Nombre"
                                value={oidItem.name}
                                onChange={(e) => updateOid(index, "name", e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid size={3}>
                            <TextField
                                label="OID"
                                value={oidItem.oid}
                                onChange={(e) => updateOid(index, "oid", e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid size={1}>
                            <TextField
                                label="Frecuencia (seg)"
                                type="number"
                                value={oidItem.frequency}
                                onChange={(e) =>
                                    updateOid(index, "frequency", Number(e.target.value))
                                }
                                fullWidth
                                required
                                error={oidItem.frequency < 10}
                                helperText={oidItem.frequency < 10 ? "Mínimo 10 segundos" : ""}
                                inputProps={{min: 1}}
                            />
                        </Grid>
                        <Grid size="grow" >
                            <RulesInput rules={props.rules} values={oidItem.rules} onChange={(values) => updateRules(index, values)} />
                        </Grid>
                        <Grid size="auto" sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton aria-label="delete" color="error" onClick={() => removeOid(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
            </Grid>

            <Grid size={12}>
                <Button variant="outlined" onClick={addOid} startIcon={<AddIcon />}>
                    Agregar OID
                </Button>
            </Grid>
        </Grid>
    );
};
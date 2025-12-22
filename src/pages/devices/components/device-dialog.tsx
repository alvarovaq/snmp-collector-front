import { Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button, MenuItem, Grid, Typography, Divider, IconButton, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { SnmpVersion, SnmpV3AuthProtocol, SnmpV3PrivProtocol, SnmpV3SecurityLevel, Device, OidConfig, Rule, } from 'models';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { RulesInput } from './rules-input';

export interface DeviceDialogProps {
    open: boolean;
    device: Device | null;
	rules: Rule[];
    onClose: () => void;
    onSave: (device: Device) => void;
}

export const DeviceDialog = (props: DeviceDialogProps) => {
    const { open, onClose, onSave } = props;

    const [name, setName] = useState<string>("");
    const [ip, setIp] = useState<string>("");
    const [port, setPort] = useState<number>(161);
    const [version, setVersion] = useState<SnmpVersion>(SnmpVersion.Version2c);
    const [community, setCommunity] = useState<string>("public");
    const [context, setContext] = useState<string>("");
    const [user, setUser] = useState("");
    const [level, setLevel] = useState<SnmpV3SecurityLevel>(SnmpV3SecurityLevel.NoAuthNoPriv);
    const [authProtocol, setAuthProtocol] = useState<SnmpV3AuthProtocol | undefined>(undefined);
    const [authKey, setAuthKey] = useState("");
    const [privProtocol, setPrivProtocol] = useState<SnmpV3PrivProtocol | undefined>(undefined);
    const [privKey, setPrivKey] = useState("");
    const [oids, setOids] = useState<Array<OidConfig>>([]);
	const [rules, setRules] = useState<Array<number>>([]);

    useEffect(() => {
        if (open) {
            if (!props.device) {
                setName("");
                setIp("");
                setPort(161);
                setVersion(SnmpVersion.Version2c);
                setCommunity("public");
                setContext("");
                setUser("");
                setLevel(SnmpV3SecurityLevel.NoAuthNoPriv);
                setAuthProtocol(undefined);
                setAuthKey("");
                setPrivProtocol(undefined);
                setPrivKey("");
                setOids([]);
            } else {
                setName(props.device.name);
                setIp(props.device.config.ip);
                setPort(props.device.config.port);
                setVersion(props.device.config.version);
                setCommunity(props.device.config.community || "");
                setContext(props.device.config.context || "");
                setUser(props.device.config.security?.user || "");
                setLevel(props.device.config.security?.level || SnmpV3SecurityLevel.NoAuthNoPriv);
                setAuthProtocol(props.device.config.security?.authProtocol);
                setAuthKey(props.device.config.security?.authKey || "");
                setPrivProtocol(props.device.config.security?.privProtocol);
                setPrivKey(props.device.config.security?.privKey || "");
                setOids(props.device.oids);
            }
        }
    }, [open, props.device]);

    const isFormValid = (): boolean => {
        if (!name || !ip || !port) return false;

        if (version === SnmpVersion.Version2c) {
            return !!community;
        }

        if (version === SnmpVersion.Version3) {
            if (!user) return false;

            if (level === SnmpV3SecurityLevel.AuthNoPriv ||
                level === SnmpV3SecurityLevel.AuthPriv) {
                if (!authProtocol || !authKey) return false;
            }

            if (level === SnmpV3SecurityLevel.AuthPriv) {
                if (!privProtocol || !privKey) return false;
            }
        }

        if (oids.some((o) => o.frequency < 10)) return false;

        return true;
    };

    const addOid = (): void => {
        setOids([...oids, { name: "", oid: "", frequency: 30, rules: [] }]);
    };

    const updateOid = (index: number, field: string, value: any): void => {
        const updated = [...oids];
        updated[index] = { ...updated[index], [field]: value };
        setOids(updated);
    };

	const updateRules = (index: number, values: number[]): void => {
		const updated = [...oids];
		updated[index] = { ...updated[index], rules: [...values] };
		setOids(updated);
	};

    const removeOid = (index: number) => {
        const updated = [...oids];
        updated.splice(index, 1);
        setOids(updated);
    };

    const saveDevice = (): void => {
        if (!isFormValid()) return;

        const device: Device = {
            id: props.device ? props.device.id : -1,
            name,
            config: {
                ip,
                port,
                version,
                community: version === SnmpVersion.Version2c ? community : undefined,
                context: version === SnmpVersion.Version3 ? context : undefined,
                security: version === SnmpVersion.Version3 ? {
                    user,
                    level,
                    authProtocol,
                    authKey,
                    privProtocol,
                    privKey,
                } : undefined,
            },
            oids: oids,
        };

        onSave(device);
    };

    return (    
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
            <DialogTitle>{ props.device ? "Editar dispositivo" : "Crear dispositivo"}</DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid size={12}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
                            Detalles del dispositivo
                        </Typography>
                        <Divider />
                    </Grid>

                    <Grid size={12} >
                        <TextField
                            label="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid size={8}>
                        <TextField
                            label="Dirección IP"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid size={4}>
                        <TextField
                            label="Puerto"
                            type="number"
                            value={port}
                            onChange={(e) => setPort(Number(e.target.value))}
                            fullWidth
                        />
                    </Grid>

                    <Grid size={4}>
                        <TextField
                            label="Versión SNMP"
                            select
                            value={version}
                            onChange={(e) => setVersion(Number(e.target.value) as SnmpVersion)}
                            fullWidth
                        >
                            <MenuItem value={SnmpVersion.Version2c}>v2c</MenuItem>
                            <MenuItem value={SnmpVersion.Version3}>v3</MenuItem>
                        </TextField>
                    </Grid>

                    {version === SnmpVersion.Version2c && (
                        <Grid size={8}>
                            <TextField
                                label="Comunidad"
                                value={community}
                                onChange={(e) => setCommunity(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                    )}

                    {version === SnmpVersion.Version3 && (
                        <>
                            <Grid size={8}>
                                <TextField
                                    label="Contexto"
                                    value={context}
                                    onChange={(e) => setContext(e.target.value)}
                                    fullWidth
                                />
                            </Grid>

                            <Grid size={12}>
                                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
                                    Configuración de autenticación
                                </Typography>
                                <Divider />
                            </Grid>
                            
                            <Grid size={8}>
                                <TextField
                                    label="Usuario"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid size={4}>
                                <TextField
                                    label="Nivel de seguridad"
                                    select
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value as SnmpV3SecurityLevel)}
                                    fullWidth
                                >
                                    <MenuItem value={SnmpV3SecurityLevel.NoAuthNoPriv}>NoAuthNoPriv</MenuItem>
                                    <MenuItem value={SnmpV3SecurityLevel.AuthNoPriv}>AuthNoPriv</MenuItem>
                                    <MenuItem value={SnmpV3SecurityLevel.AuthPriv}>AuthPriv</MenuItem>
                                </TextField>
                            </Grid>

                            {(level === SnmpV3SecurityLevel.AuthNoPriv ||
                                level === SnmpV3SecurityLevel.AuthPriv) && (
                                <>
                                    <Grid size={6}>
                                        <TextField
                                            label="Protocolo de autenticación"
                                            select
                                            value={authProtocol}
                                            onChange={(e) => setAuthProtocol(e.target.value as SnmpV3AuthProtocol)}
                                            fullWidth
                                        >
                                            <MenuItem value={SnmpV3AuthProtocol.MD5}>MD5</MenuItem>
                                            <MenuItem value={SnmpV3AuthProtocol.SHA}>SHA</MenuItem>
                                        </TextField>
                                    </Grid>
                                    
                                    <Grid size={6}>
                                        <TextField
                                            label="Clave de autenticación"
                                            type="password"
                                            value={authKey}
                                            onChange={(e) => setAuthKey(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                </>
                            )}

                            {level === SnmpV3SecurityLevel.AuthPriv && (
                                <>
                                    <Grid size={6}>
                                        <TextField
                                            label="Protocolo de privacidad"
                                            select
                                            value={privProtocol}
                                            onChange={(e) => setPrivProtocol(e.target.value as SnmpV3PrivProtocol)}
                                            fullWidth
                                        >
                                            <MenuItem value={SnmpV3PrivProtocol.DES}>DES</MenuItem>
                                            <MenuItem value={SnmpV3PrivProtocol.AES}>AES</MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid size={6}>
                                        <TextField
                                            label="Clave de privacidad"
                                            type="password"
                                            value={privKey}
                                            onChange={(e) => setPrivKey(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                </>
                            )}
                        </>
                    )}

                    <Grid size={12}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
                            OIDs del dispositivo
                        </Typography>
                        <Divider />
                    </Grid>

                    <Grid container spacing={1} sx={{ width: "100%" }} >
                        {oids.map((oidItem, index) => (
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

                                <Grid size={2}>
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

                                <Grid size={3} >
									<RulesInput rules={props.rules} values={oidItem.rules} onChange={(values) => updateRules(index, values)} />
                                </Grid>

                                <Grid size={1} sx={{ display: "flex", alignItems: "center" }}>
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
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={saveDevice} disabled={!isFormValid()}>
                    {"Guardar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
import { Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button, MenuItem, Grid, } from '@mui/material';
import { Role, User } from 'models';
import { useEffect, useState } from 'react';

export interface UserDialogProps {
    open: boolean;
    user: User | null;
    onClose: () => void;
    onSave: (user: User) => void;
}

export const UserDialog = (props: UserDialogProps) => {
    const { open, onClose, onSave } = props;

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<Role>(Role.VIEWER);

    useEffect(() => {
        if (open) {
            if (!props.user) {
                setName("");
                setEmail("");
                setRole(Role.VIEWER);
            } else {
                setName(props.user.name);
                setEmail(props.user.email);
                setRole(props.user.role);
            }
        }
    }, [open, props.user]);

    const isFormValid = (): boolean => {
        if (!name || !email || !role) return false;

        return true;
    };

    const saveUser = (): void => {
        if (!isFormValid()) return;

        const user: User = {
            id: props.user ? props.user.id : -1,
            name: name,
            email: email,
            role: role
        };

        onSave(user);
    };

    return (    
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{ props.user ? "Editar usuario" : "Crear usuario"}</DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid size={16} >
                        <TextField
                            label="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid size={16} >
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid size={16}>
                        <TextField
                            label="Rol"
                            select
                            value={role}
                            onChange={(e) => setRole(e.target.value as Role)}
                            fullWidth
                        >
                            <MenuItem value={Role.VIEWER}>Visualizador</MenuItem>
                            <MenuItem value={Role.ADMIN}>Administrador</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={saveUser} disabled={!isFormValid()}>
                    {"Guardar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
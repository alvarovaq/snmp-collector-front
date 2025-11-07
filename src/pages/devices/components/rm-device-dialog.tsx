import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, } from "@mui/material";

export interface RmDeviceDialogProps {
    open: boolean;
    device: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export const RmDeviceDialog = (props: RmDeviceDialogProps) => {
    return (
        <Dialog open={props.open} onClose={props.onCancel} fullWidth maxWidth="sm">
            <DialogTitle>{ "Eliminar dispositivo" }</DialogTitle>

            <DialogContent dividers>
                <Typography sx={{ mb: 2 }}>
                    ¿Estás seguro de querer eliminar el dispositivo{" "}
                    <Typography component="span" color="secondary">
                        {props.device}
                    </Typography>
                    ?
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={props.onCancel}>Cancelar</Button>
                <Button variant="contained" onClick={props.onConfirm}>Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
};
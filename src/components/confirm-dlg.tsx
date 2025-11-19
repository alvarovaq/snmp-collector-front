import { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export interface ConfirmDlgProps {
    open: boolean;
    title: string;
    onCancel: () => void;
    onConfirm: () => void;
    children?: ReactNode;
}

export const ConfirmDlg = (props: ConfirmDlgProps) => {
    return (
        <Dialog open={props.open} onClose={props.onCancel} fullWidth maxWidth="sm">
            <DialogTitle>{ props.title }</DialogTitle>

            <DialogContent dividers>
                {props.children}
            </DialogContent>

            <DialogActions>
                <Button onClick={props.onCancel}>Cancelar</Button>
                <Button variant="contained" onClick={props.onConfirm}>Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
};
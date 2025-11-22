import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, Button, CircularProgress, } from "@mui/material";
import { AuthClient } from "clients";
import { useNotification } from "context";
import { ResetPWDTokenReq } from "models";
import { useEffect, useState } from "react";

console.log(window.location.pathname);
console.log(window.location.origin);
console.log(window.location.search);
console.log(window.location.href);

export interface ResetPWDDialogProps {
    open: boolean;
    onClose: (b: boolean) => void;
}

export const ResetPWDDialog = (props: ResetPWDDialogProps) => {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { notify } = useNotification();

    useEffect(() => {
        if (props.open) {
            setEmail("");
            setLoading(false);
        }
    }, [props.open]);

    const checkEmail = (): boolean => {
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return emailRegex.test(email);
    };

    const send = (): void => {
        setLoading(true);
        const req: ResetPWDTokenReq = {
            url: window.location.origin + "/reset-password",
            email: email
        };
        AuthClient.resetPasswordToken(req)
            .then(() => {
                notify("Te hemos enviado un enlace para restablecer tu contraseña", "success");
            })
            .catch((err) => {
                console.error("Error al pedir token de recuperación de contraseña", err);
                notify("Hubo un problema al enviar el correo. Vuelva a intentarlo en unos segundos", "error");
            })
            .finally(() => {
                setLoading(false);
                props.onClose(true);
            });
    };

    return (
        <Dialog open={props.open} onClose={() => props.onClose(false)}>
            <DialogTitle>Recuperar contraseña</DialogTitle>
            <DialogContent>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Introduce tu email y te enviaremos un enlace para restablecer tu contraseña.
                </Typography>
                <TextField
                    autoFocus
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onClose(false)}>Cancelar</Button>
                <Button
                    variant="contained"
                    disabled={!checkEmail()}
                    onClick={send}
                >
                    {loading ? <CircularProgress size={20} /> : "Enviar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
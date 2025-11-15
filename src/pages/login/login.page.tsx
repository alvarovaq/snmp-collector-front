import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    IconButton,
    InputAdornment,
    useTheme,
    Alert,
    CircularProgress,
} from "@mui/material";
import SensorsIcon from "@mui/icons-material/Sensors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Credentials } from "models";
import { AuthClient } from "clients";
import { authService } from "services";

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    const verify = (credentials: Credentials): boolean => {
        if (!credentials.email) {
            setError("El email es requerido");
            return false;
        }

        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRegex.test(credentials.email)) {
            setError("Introduce un email válido");
            return false;
        }

        if (!credentials.password) {
            setError("La contraseña es requerida");
            return false;
        }

        return true;
    };

    const login = (credentials: Credentials) => {
        setLoading(true);
        AuthClient.login(credentials)
            .then((token: string) => {
                authService.login(token);
            })
            .catch((err) => {
                setError("No se pudo iniciar sesión. Comprueba tu email y contraseña e inténtalo de nuevo");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const credentials: Credentials = { email, password };

        if (!verify(credentials)) return;

        login(credentials);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: theme.palette.background.default,
                p: 2,
            }}
        >
            <Paper
                elevation={12}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    width: "100%",
                    maxWidth: 420,
                    backdropFilter: "blur(10px)",
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    color: theme.palette.text.primary,
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main, width: 56, height: 56 }}>
                        <SensorsIcon fontSize="large" />
                    </Avatar>

                    <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
                        SNMP Collector
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
                        Monitorización de dispositivos SNMP
                    </Typography>
                </Box>

                <Box component="form" sx={{ mt: 4 }} onSubmit={handleSubmit}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <TextField
                        fullWidth
                        required
                        margin="normal"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
                        InputProps={{ sx: { color: theme.palette.text.primary } }}
                    />

                    <TextField
                        fullWidth
                        required
                        margin="normal"
                        label="Contraseña"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
                        InputProps={{
                            sx: { color: theme.palette.text.primary },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((v) => !v)}
                                        edge="end"
                                        sx={{ color: theme.palette.text.secondary }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 3,
                            py: 1.2,
                            fontWeight: 600,
                            letterSpacing: 0.5,
                            borderRadius: 2,
                        }}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Entrar"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

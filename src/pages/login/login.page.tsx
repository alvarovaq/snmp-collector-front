import React from "react";
import {
    Avatar,
    Box,
    Button,
    CssBaseline,
    TextField,
    Typography,
    Paper,
    IconButton,
    InputAdornment,
    useTheme,
} from "@mui/material";
import SensorsIcon from "@mui/icons-material/Sensors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const LoginPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const theme = useTheme();

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
            <CssBaseline />

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

                <Box component="form" sx={{ mt: 4 }}>
                    <TextField
                        fullWidth
                        required
                        margin="normal"
                        label="Email"
                        variant="outlined"
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
                    >
                        Entrar
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
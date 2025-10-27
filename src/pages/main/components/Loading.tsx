import { Box, CircularProgress, Typography} from '@mui/material';

export const LoadingComponent = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                bgcolor: "background.default",
                color: "primary.main",
                textAlign: "center",
            }}
        >
            <CircularProgress color="primary" size={80} thickness={4} />
            <Typography variant="h5" sx={{ mt: 3 }}>
                Cargando...
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                Por favor, espera un momento
            </Typography>
        </Box>
    );
};
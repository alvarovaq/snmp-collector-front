import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthClient } from 'clients';
import { useTheme } from '@mui/material/styles';
import { ResetPasswordReq } from 'models';

export const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Ambos campos son obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 carácteres");
      return;
    }

    setLoading(true);

    const req: ResetPasswordReq = {
        token: token || "",
        password: password
    };
    AuthClient.resetPassword(req)
        .then(() => {
            setSuccess(true);
        })
        .catch((err) => {
            console.log("Error al cambiar contraseña", err);
            setError("No se puedo restablecer la contrasea. Inténtalo de nuevo.");
        })
        .finally(() => {
            setLoading(false);
        });
  };

  if (success) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: theme.palette.background.default,
          p: 2
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: 4,
            borderRadius: 4,
            width: '100%',
            maxWidth: 420,
            backdropFilter: 'blur(10px)',
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.primary,
            textAlign: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.success.main, width: 56, height: 56, mx: 'auto' }}>
            <LockResetIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 600, mt: 1 }}>
            Contraseña restablecida
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, mb: 3 }}>
            Tu contraseña se ha restablecido correctamente.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
          >
            Ir al login
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.background.default,
        p: 2
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 420,
          backdropFilter: 'blur(10px)',
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main, width: 56, height: 56 }}>
            <LockResetIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
            Restablecer contraseña
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5, textAlign: 'center' }}>
            Ingresa tu nueva contraseña para completar el proceso.
          </Typography>
        </Box>

        <Box component="form" sx={{ mt: 4 }} onSubmit={handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <TextField
            fullWidth
            required
            margin="normal"
            label="Nueva contraseña"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((v) => !v)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            required
            margin="normal"
            label="Confirmar contraseña"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword((v) => !v)} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, py: 1.2, fontWeight: 600, letterSpacing: 0.5, borderRadius: 2 }}
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Restablecer contraseña'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

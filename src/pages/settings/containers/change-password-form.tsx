import React, { useState } from 'react';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { AuthClient } from 'clients';
import { ChangePasswordReq } from 'models';
import { useNotification } from 'context';

interface ChangePasswordFormProps {
}

export const ChangePasswordForm = (props: ChangePasswordFormProps) => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { notify } = useNotification();

  const handleSubmit = () => {
    if (newPassword.length < 8) {
      notify("La nueva contraseña debe tener al menos 8 carácteres", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      notify("Las contraseñas no coinciden", "error");
      return;
    }

    setError('');
    setLoading(true);
    
    const req: ChangePasswordReq = {
      password: currentPassword,
      newPassword: newPassword
    };
    AuthClient.changePassword(req)
      .then(() => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        notify("Contraseña cambiada correctamente", "success");
      })
      .catch((err) => {
        notify("No se pudo cambiar la contraseña. Verifica tu contraseña actual e inténtalo de nuevo", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box sx={{ maxWidth: 400, mt: 2 }}>
      <Typography variant="h6" gutterBottom>Cambiar contraseña</Typography>
      <TextField
        label="Contraseña actual"
        type="password"
        fullWidth
        margin="normal"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <TextField
        label="Nueva contraseña"
        type="password"
        fullWidth
        margin="normal"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <TextField
        label="Confirmar nueva contraseña"
        type="password"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button sx={{ mt: 2 }} variant="contained" color="primary" onClick={handleSubmit} disabled={loading} >
        { loading ? <CircularProgress size={24} /> : 'Guardar' }
      </Button>
    </Box>
  );
};

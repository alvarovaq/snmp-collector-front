import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface ChangePasswordPageProps {
  onChangePassword: (currentPassword: string, newPassword: string) => void;
}

export const ChangePasswordPage = (props: ChangePasswordPageProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setError('');
    props.onChangePassword(currentPassword, newPassword);
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
      <Button sx={{ mt: 2 }} variant="contained" color="primary" onClick={handleSubmit}>
        Guardar
      </Button>
    </Box>
  );
};

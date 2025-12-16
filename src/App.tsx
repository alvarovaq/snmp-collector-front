import React, { useEffect } from 'react';
import { MainPage } from 'pages/main';
import { LoginPage } from 'pages/login';
import { ResetPasswordPage } from 'pages/reset-password';
import { NotificationProvider, WebSocketProvider } from 'context';
import env from "config/env.config";
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from 'theme/theme';
import { useSelector } from 'react-redux';
import { initServices } from 'services';
import { selectToken } from 'store/selectors';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from "date-fns/locale";

function App() {
  const token: string | null = useSelector(selectToken);

  useEffect(() => {
    initServices();
  }, []);

  return (
    <WebSocketProvider url={env.wsUrl}>
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es} >
            <CssBaseline />
            <Router>
              <Routes>
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                <Route path="/*" element={token ? <MainPage /> : <LoginPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Router>
          </LocalizationProvider>
        </NotificationProvider>
      </ThemeProvider>
    </WebSocketProvider>
  );
}

export default App;

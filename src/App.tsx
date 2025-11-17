import React, { useEffect } from 'react';
import { MainPage } from 'pages/main';
import { LoginPage } from 'pages/login';
import { NotificationProvider, WebSocketProvider } from 'context';
import env from "config/env.config";
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from 'theme/theme';
import { useSelector } from 'react-redux';
import { initServices } from 'services';
import { selectToken } from 'store/selectors/auth';

function App() {
  const token: string | null = useSelector(selectToken);

  useEffect(() => {
    initServices();
  }, []);

  return (
    <WebSocketProvider url={env.wsUrl}>
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <CssBaseline />
          { token ? <MainPage /> : <LoginPage /> }
        </NotificationProvider>
      </ThemeProvider>
    </WebSocketProvider>
  );
}

export default App;

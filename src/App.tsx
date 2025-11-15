import React from 'react';
import { MainPage } from 'pages/main';
import { LoginPage } from 'pages/login';
import { NotificationProvider, WebSocketProvider } from 'context';
import env from "config/env.config";
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from 'theme/theme';
import { useSelector } from 'react-redux';
import { AuthState } from "models";
import { ReduxState } from 'store';

const selectAuth = (state: ReduxState): AuthState => state.auth;

function App() {
  const auth: AuthState = useSelector(selectAuth);

  return (
    <WebSocketProvider url={env.wsUrl}>
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <CssBaseline />
          { auth.token ? <MainPage /> : <LoginPage /> }
        </NotificationProvider>
      </ThemeProvider>
    </WebSocketProvider>
  );
}

export default App;

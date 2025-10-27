import React from 'react';
import { MainPage } from 'pages/main';
import { WebSocketProvider } from 'context';
import env from "config/env.config";
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from 'theme/theme';

function App() {
  return (
    <WebSocketProvider url={env.wsUrl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainPage />
      </ThemeProvider>
    </WebSocketProvider>
  );
}

export default App;

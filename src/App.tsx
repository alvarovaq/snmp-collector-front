import React from 'react';
import { MainPage } from 'features/main/main.page';
import { WebSocketProvider } from 'context';
import env from "config/env.config";

function App() {
  return (
    <WebSocketProvider url={env.wsUrl}>
      <MainPage />
    </WebSocketProvider>
  );
}

export default App;

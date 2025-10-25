import React, { Context, createContext, useContext } from "react";
import { useWebSocket } from "../hooks";
import { WSMessage, WSStatus, WSEvent } from "../models";

interface WebSocketContextType {
  status: WSStatus;
  sendMessage: (msg: WSMessage) => void;
  addHandler: (event: WSEvent, handler: (data: any) => void) => () => void;
}

const WebSocketContext: Context<WebSocketContextType | null> = createContext<WebSocketContextType | null>(null);

interface WebSocketProviderProps {
  url: string;
  children: React.ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ url, children }) => {
  const ws = useWebSocket(url);

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};

export const useWS = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("useWS debe estar dentro de WebSocketProvider");
  return context;
};

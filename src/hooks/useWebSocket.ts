import { useEffect, useRef, useState } from "react";
import { WSMessage, WSStatus, WSEvent } from "../models";

type MessageHandler = (data: any) => void;

export function useWebSocket(url: string) {
  const wsRef = useRef<WebSocket | null>(null);
  const handlersRef = useRef<Map<WSEvent, Set<MessageHandler>>>(new Map());
  const [status, setStatus] = useState<WSStatus>(WSStatus.CLOSED);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;
    setStatus(WSStatus.CONNECTING);

    ws.onopen = () => setStatus(WSStatus.OPEN);

    ws.onmessage = (event) => {
      try {
        const msg: WSMessage = JSON.parse(event.data);
        const handlers = handlersRef.current.get(msg.event);
        if (handlers) {
          handlers.forEach((h) => h(msg.data));
        }
      } catch {
        console.error("Invalid message format");
      }
    };

    ws.onclose = () => setStatus(WSStatus.CLOSED);
    ws.onerror = () => setStatus(WSStatus.ERROR);

    return () => ws.close();
  }, [url]);
  
  const sendMessage = (msg: WSMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };
  
  const addHandler = (event: WSEvent, handler: MessageHandler) => {
    if (!handlersRef.current.has(event)) {
      handlersRef.current.set(event, new Set());
    }
    handlersRef.current.get(event)!.add(handler);
    return () => handlersRef.current.get(event)!.delete(handler);
  };

  return { status, sendMessage, addHandler };
}

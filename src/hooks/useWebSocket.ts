import { useEffect, useRef, useState } from "react";
import { DefaultSettings, MAX_MESSAGES } from "../settings";
import { Author, ChatMessage, Stats } from "../types";

function useWebSocket(wsAdress: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [stats, setStats] = useState<Stats>(DefaultSettings.Stats);
  const [user, setUser] = useState<Author>(DefaultSettings.User);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(wsAdress);
    socketRef.current = socket;

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "message") {
        const messageData = data.data;
        setMessages((prev) => {
          return [
            ...prev,
            {
              author: messageData.author,
              text: messageData.text,
              avatarId: messageData.avatarId,
              timestamp: messageData.timestamp,
            },
          ].slice(-MAX_MESSAGES);
        });
      }

      if (data.type === "stats") {
        setStats(data.data);
      }

      if (data.type === "clientId") {
        setUser((prev) => {
          return {
            ...prev,
            id: data.data.id,
          };
        });
      }
    };

    return () => {
      socket.close();
    };
  }, [wsAdress]);

  return { messages, stats, user, socketRef };
}

export default useWebSocket;

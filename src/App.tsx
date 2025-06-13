import React, { useEffect, useRef, useState } from "react";
import Chat from "./components/Chat/Chat";
import Profile from "./components/Profile/Profile";
import FunFact from "./components/FunFact/FunFact";
import MessageInput from "./components/MessageInput/MessageInput";
import styles from "./App.module.css";

interface Author {
  name: string;
  id: string;
  avatarId: number;
}

interface ChatMessage {
  author: Author;
  text: string;
  timestamp: number;
}

const WS_ADDRESS = "ws://5.75.243.158:3001";

interface Stats {
  bots: number;
  realPeople: number;
}

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");
  const [clientId, setClientId] = useState<string>("");
  const [stats, setStats] = useState<Stats>({ bots: 0, realPeople: 1 });
  const socketRef = useRef<WebSocket>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const socket = new WebSocket(WS_ADDRESS);
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
          ].slice(0, 50);
        });
      }

      if (data.type === "stats") {
        setStats(data.data);
      }

      if (data.type === "clientId") {
        setClientId(data.data.id);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const author = {
      id: clientId,
      name: "Whiskers McFluffy",
      avatarId: 1,
    };
    const message = {
      author,
      text: userMessage,
    };
    socketRef.current?.send(
      JSON.stringify({
        type: "message",
        data: message,
      })
    );
    setUserMessage("");
  };

  return (
    <div className={styles["app-wrapper"]}>
      <Profile />
      <FunFact />
      <Chat ref={chatRef} messages={messages} clientId={clientId} />
      <MessageInput
        handleSubmit={handleSubmit}
        userMessage={userMessage}
        setUserMessage={setUserMessage}
      />
    </div>
  );
}

export default App;

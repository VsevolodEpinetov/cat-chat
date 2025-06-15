import { useContext, useEffect, useRef } from "react";
import Message from "../Message/Message";
import styles from "./Chat.module.css";
import { ChatMessage } from "../../types";
import { UserContext } from "../../contexts/user";

const Chat = ({ messages }: { messages: ChatMessage[] }) => {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const user = useContext(UserContext);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div ref={chatRef} className={styles.wrapper}>
      {messages.map((mes, mesId) => (
        <Message
          key={`message-${mesId}`}
          text={mes.text}
          author={mes.author}
          timestamp={mes.timestamp}
          isMine={user.id === mes.author.id}
        />
      ))}
    </div>
  );
};

export default Chat;

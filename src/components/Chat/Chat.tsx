import { forwardRef } from "react";
import Message from "../Message/Message";
import styles from "./Chat.module.css";

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

const Chat = forwardRef<
  HTMLDivElement,
  { messages: ChatMessage[]; clientId: string }
>((props, ref) => {
  return (
    <div ref={ref} className={styles.wrapper}>
      {props.messages.map((mes, mesId) => (
        <Message
          key={`message-${mesId}`}
          text={mes.text}
          author={mes.author}
          timestamp={mes.timestamp}
          isMine={props.clientId === mes.author.id}
        />
      ))}
    </div>
  );
});

export default Chat;

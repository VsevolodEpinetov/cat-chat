import { useContext, useState } from "react";
import styles from "./MessageInput.module.css";
import { UserContext } from "../../contexts/user";

function MessageInput({
  socketRef,
}: {
  socketRef: React.RefObject<WebSocket | null>;
}) {
  const [message, setMessage] = useState<string>("");
  const user = useContext(UserContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const author = {
      id: user.id,
      name: "Whiskers McFluffy",
      avatarId: 1,
    };
    const data = {
      author,
      text: message,
    };
    socketRef.current?.send(
      JSON.stringify({
        type: "message",
        data,
      })
    );
    setMessage("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        id="message"
        className={styles.input}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoComplete={"off"}
      />
      <input type="submit" value="Send meow" className={styles.button} />
    </form>
  );
}

export default MessageInput;

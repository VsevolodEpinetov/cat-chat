import { useContext, useState } from "react";
import styles from "./MessageInput.module.css";
import { UserContext } from "../../contexts/user";
import { SOCIALS } from "../../settings";

function MessageInput({
  socketRef,
}: {
  socketRef: React.RefObject<WebSocket | null>;
}) {
  const [message, setMessage] = useState<string>("");
  const { user } = useContext(UserContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const author = {
      id: user.id,
      name: user.name,
      avatarId: user.avatarId,
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
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          id="message"
          className={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete={"off"}
          placeholder="Tell the cats about your day! Don't worry, everything is autotranslated"
        />
        <input type="submit" value="Send meow" className={styles.button} />
      </form>
      <ul className={styles.socials}>
        {SOCIALS.map((but, id) => {
          return (
            <li key={`socialbutton-${id}`}>
              <a
                className={styles.link}
                href={but.link}
                target="_blank"
                rel="noreferrer"
              >
                {but.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MessageInput;

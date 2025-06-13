import styles from "./MessageInput.module.css";

function MessageInput({
  handleSubmit,
  userMessage,
  setUserMessage,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        id="message"
        className={styles.input}
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        autoComplete={"off"}
      />
      <input type="submit" value="Send meow" className={styles.button} />
    </form>
  );
}

export default MessageInput;

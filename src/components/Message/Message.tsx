import styles from "./Message.module.css";

interface Author {
  name: string;
  id: string;
  avatarId: number;
}

function Message({
  text,
  author,
  timestamp,
  isMine,
}: {
  text: string;
  author: Author;
  timestamp: number;
  isMine: boolean;
}) {
  const timestampDate = new Date(timestamp);

  const formattedTimestamp = timestampDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`${styles.wrapper}${
        isMine ? ` ${styles["wrapper--mine"]}` : ""
      }`}
    >
      <img
        className={styles.avatar}
        src={`./avatars/avatar-${author.avatarId}.jpg`}
        width="50px"
        height="50px"
        alt="User avatar"
      />
      <div className={styles["text-wrapper"]}>
        <div className={styles.body}>
          <p className={styles.name}>{author.name}</p>
          <p className={styles.message}>{text}</p>
        </div>
        <p className={styles.timestamp}>{formattedTimestamp}</p>
      </div>
    </div>
  );
}

export default Message;

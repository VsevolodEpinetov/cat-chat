import { useContext } from "react";
import styles from "./Profile.module.css";
import { UserContext } from "../../contexts/user";
import { Author } from "../../types";

function Profile() {
  const user: Author = useContext(UserContext);
  return (
    <header className={styles["header-wrapper"]}>
      <img
        className={styles.avatar}
        src={`./avatars/avatar-${user.avatarId}.jpg`}
        alt=""
        width={50}
        height={50}
      />
      <div className={styles["header-info"]}>
        <p className={styles.name}>{user.name}</p>
        <p className={styles.status}>Online</p>
      </div>
    </header>
  );
}

export default Profile;

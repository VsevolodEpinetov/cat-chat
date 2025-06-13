import styles from "./Profile.module.css";

function Profile() {
  return (
    <header className={styles["header-wrapper"]}>
      <img
        className={styles.avatar}
        src="./avatars/avatar-1.jpg"
        alt=""
        width={50}
        height={50}
      />
      <div className={styles["header-info"]}>
        <p className={styles.name}>Whiskers McFluffy</p>
        <p className={styles.status}>Online</p>
      </div>
    </header>
  );
}

export default Profile;

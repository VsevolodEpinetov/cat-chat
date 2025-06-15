import { useContext, useEffect } from "react";
import styles from "./Profile.module.css";
import { UserContext } from "../../contexts/user";
import { Stats, UserContextType } from "../../types";
import { MAX_AVATAR_ID } from "../../settings";
import { getRandomName } from "../../util";

function Profile({
  stats,
  factIsOpened,
}: {
  stats: Stats;
  factIsOpened: boolean;
}) {
  const { user, setUser } = useContext<UserContextType>(UserContext);

  useEffect(() => {
    const randomName = getRandomName();

    setUser((prev) => {
      return {
        ...prev,
        name: randomName,
      };
    });
  }, []);

  const handleAvatarClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    setUser((prev) => {
      const prevAvatarId = prev.avatarId;
      const newAvatarId = prevAvatarId < MAX_AVATAR_ID ? prevAvatarId + 1 : 0;

      return {
        ...prev,
        avatarId: newAvatarId,
      };
    });
  };

  const handleNameClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const newName = getRandomName();

    setUser((prev) => {
      return {
        ...prev,
        name: newName,
      };
    });
  };

  return (
    <header
      className={`${styles["header-wrapper"]}${
        factIsOpened ? ` ${styles["header-wrapper--rect"]}` : ""
      }`}
    >
      <div className={styles["main-info"]}>
        <span className={styles["img-wrapper"]} onClick={handleAvatarClick}>
          <img
            className={styles.avatar}
            src={`./avatars/avatar-${user.avatarId}.jpg`}
            alt=""
            width={50}
            height={50}
          />
        </span>
        <div className={styles["header-info"]}>
          <p className={styles.name} onClick={handleNameClick}>
            {user.name}
          </p>
          <p className={styles.status}>Online</p>
        </div>
      </div>
      <div>
        Cats online: {stats.bots + stats.realPeople}, real cats:{" "}
        {stats.realPeople}
      </div>
    </header>
  );
}

export default Profile;

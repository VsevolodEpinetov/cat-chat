import React, { useEffect, useState } from "react";
import styles from "./FunFact.module.css";
import { randomElement } from "../../util";
import { FACTS } from "../../settings";

function FunFact({
  isOpened,
  setIsOpened,
}: {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [factId, setFactId] = useState<number>(0);
  const [animationKey, setAnimationKey] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFactId((prevId) => {
        const newId = prevId < FACTS.length ? prevId + 1 : 0;
        return newId;
      });
      setAnimationKey((prev) => prev + 1);
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      className={`${styles.wrapper}${
        !isOpened ? ` ${styles["wrapper--hidden"]}` : ""
      }`}
      key={animationKey}
    >
      <p className={styles.text}>{FACTS[factId]}</p>
      <button
        className={styles.button}
        type="button"
        onClick={() => setIsOpened(!isOpened)}
      >
        X
      </button>
    </div>
  );
}

export default FunFact;

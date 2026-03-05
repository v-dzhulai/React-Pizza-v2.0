import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Нічого не знайдено
      </h1>
      <p className={styles.description}>
        Нажаль ця сторінка відсутня у нашому інтернет-магазині
      </p>
    </div>
  );
};

export default NotFoundBlock;

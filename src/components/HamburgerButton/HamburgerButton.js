import React from "react";

import styles from "./HamburgerButton.module.css";

const HamburgerButton = (props) => {
  return (
    <div className={styles["hamburger-button"]}>
      <div className={styles["line"]} />
      <div className={styles["line"]} />
      <div className={styles["line"]} />
    </div>
  );
};

export default HamburgerButton;

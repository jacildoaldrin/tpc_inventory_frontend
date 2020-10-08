import React from "react";

import styles from "./HamburgerButton.module.css";

const HamburgerButton = (props) => {
  let burgerStyle = props.toggled
    ? `${styles["menu-btn"]} ${styles["open"]}`
    : styles["menu-btn"];

  return (
    <div className={burgerStyle} onClick={() => props.click()}>
      <span />
      <span className={styles["menu-btn-burger"]} />
      <span />
    </div>
  );
};

export default HamburgerButton;

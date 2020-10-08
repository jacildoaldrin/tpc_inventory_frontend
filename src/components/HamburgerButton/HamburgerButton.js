import React from "react";

import styles from "./HamburgerButton.module.css";

const HamburgerButton = (props) => {
  let style = props.showSideDrawer ? styles['open'] : null;
  return (
    <div className={styles["hamburger-button"]} onClick={() => props.click()}>
      <span className={style}/>
      <span className={style}/>
      <span className={style}/>
    </div>
  );
};

export default HamburgerButton;

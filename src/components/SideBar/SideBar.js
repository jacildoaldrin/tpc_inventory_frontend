import React from "react";

import styles from "./SideBar.module.css";

const SideBar = (props) => {
  return (
    <div
      className={
        props.toggled ? `${styles["side-bar"]} ${styles["open"]} ` : styles['side-bar']
      }
    ></div>
  );
};

export default SideBar;

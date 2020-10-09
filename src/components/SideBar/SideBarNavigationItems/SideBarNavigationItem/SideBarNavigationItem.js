import React from "react";

import styles from "./SideBarNavigationItem.module.css";

const SideBarNavigationItem = (props) => {
  return (
    <div
      className={
        props.activeItem === props.name
          ? `${styles["navigation-item"]} ${styles["active"]}`
          : styles["navigation-item"]
      }
      onClick={props.click}
    >
      {props.children}
      &nbsp;&nbsp;&nbsp; {props.name}
    </div>
  );
};

export default SideBarNavigationItem;

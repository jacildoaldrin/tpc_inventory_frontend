import React from "react";
import { useLocation } from "react-router-dom";

import styles from "./SideBarNavigationItem.module.css";

const SideBarNavigationItem = (props) => {
  const location = useLocation();
  return (
    <div
      className={
        location.pathname === props.route
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

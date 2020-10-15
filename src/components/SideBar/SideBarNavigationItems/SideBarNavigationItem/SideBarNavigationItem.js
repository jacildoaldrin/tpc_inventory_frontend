import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./SideBarNavigationItem.module.css";

const SideBarNavigationItem = (props) => {
  return (
    <NavLink
      to={props.route}
      className={styles["navigation-item"]}
      activeClassName={`${styles["navigation-item"]} ${styles["active"]}`}
      onClick={props.click}
    >
      {props.children}
      <div>{props.name}</div>
    </NavLink>
  );
};

export default SideBarNavigationItem;

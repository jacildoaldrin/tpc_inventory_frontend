import React from "react";

//component
import Backdrop from "../Backdrop/Backdrop";

import styles from "./SideBar.module.css";

const SideBar = (props) => {
  return (
    <>
    <Backdrop show={props.toggled} close={props.handleToggler}/>
      <div
        className={
          props.toggled
            ? `${styles["side-bar"]} ${styles["open"]} `
            : styles["side-bar"]
        }
      />
    </>
  );
};

export default SideBar;

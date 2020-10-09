import React from "react";

//assets
import UserImage from "../../assets/luka.jpg";

//component
import Backdrop from "../Backdrop/Backdrop";
import SideBarNavigationItems from "./SideBarNavigationItems/SideBarNavigationItems";

import styles from "./SideBar.module.css";

const SideBar = (props) => {
  return (
    <>
      <Backdrop show={props.toggled} close={props.close} />
      <div
        className={
          props.toggled
            ? `${styles["side-bar"]} ${styles["show"]} `
            : styles["side-bar"]
        }
      >
        <div className={styles["container"]}>
          <div className={styles["user-info"]}>
            <img src={UserImage} alt="user" className={styles["user-image"]} />
            <h1 className={styles["user-name"]}>Duka Loncic</h1>
            <h1 className={styles["user-email"]}>duka.loncic@gmail.com</h1>
          </div>
          <SideBarNavigationItems />
        </div>
      </div>
    </>
  );
};

export default SideBar;

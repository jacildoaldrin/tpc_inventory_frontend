import React from "react";

//assets
import UserImage from "assets/luka.jpg";

//context
import { useAuth } from "contexts/AuthContext";

//component
import Backdrop from "../Backdrop/Backdrop";
import SideBarNavigationItems from "./SideBarNavigationItems/SideBarNavigationItems";

import styles from "./SideBar.module.css";

const SideBar = (props) => {
  const { currUser } = useAuth();

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
            <h1 className={styles["user-email"]}>{currUser.email}</h1>
          </div>
          <SideBarNavigationItems close={props.close} />
        </div>
      </div>
    </>
  );
};

export default SideBar;

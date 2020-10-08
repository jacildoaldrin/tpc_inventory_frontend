import React from "react";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

import Logo from "../../assets/tpc_logo.jpg";
import UserImage from "../../assets/luka.jpg";

import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  return (
    <div className={styles["navbar"]}>
      <div className={styles["left-container"]}>
        <img src={Logo} alt="logo" className={styles["image"]} />
        <div className={styles["navigation-items"]}>
          <a href="/" className={styles["navigation-item"]}>
            Orders
          </a>
          <a href="/" className={styles["navigation-item"]}>
            Transactions
          </a>
          <a href="/" className={styles["navigation-item"]}>
            Products
          </a>
          <a href="/" className={styles["navigation-item"]}>
            Suppliers
          </a>
          <a href="/" className={styles["navigation-item"]}>
            Storage
          </a>
        </div>
      </div>
      <div className={styles["right-container"]}>
        <img src={UserImage} alt="user" className={styles["user-image"]} />
        <div className={styles["user-info"]}>
          <h1 className={styles["name"]}>Duka Loncic</h1>
          <h1 className={styles["logout"]}>
            <ExitToAppOutlinedIcon />
            &nbsp;Logout
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;

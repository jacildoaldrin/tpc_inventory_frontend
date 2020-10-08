import React from "react";
import { useHistory } from "react-router-dom";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

//assets
import Logo from "../../assets/tpc_logo.jpg";
import UserImage from "../../assets/luka.jpg";

//components
import HamburgerButton from "../HamburgerButton/HamburgerButton";

import styles from "./NavigationBar.module.css";

const NavigationBar = (props) => {
  const history = useHistory();

  return (
    <div className={styles["navbar"]}>
      <div className={styles["left-container"]}>
        <img src={Logo} alt="logo" className={styles["image"]} onClick={() => history.push("/")}/>
        <div className={styles["navigation-items"]}>
          <span className={styles["navigation-item"]} onClick={() => history.push("/orders")}>Orders</span>
          <span className={styles["navigation-item"]} onClick={() => history.push("/transactions")}>Transactions</span>
          <span className={styles["navigation-item"]} onClick={() => history.push("/products")}>Products</span>
          <span className={styles["navigation-item"]} onClick={() => history.push("/suppliers")}>Suppliers</span>
          <span className={styles["navigation-item"]} onClick={() => history.push("/storage")}>Storage</span>
        </div>
      </div>
      <div className={styles["right-container"]}>
        <img src={UserImage} alt="user" className={styles["user-image"]} />
        <div className={styles["user-info"]}>
          <h1 className={styles["name"]}>Duka Loncic</h1>
          <h1 className={styles["logout"]}>
            <ExitToAppOutlinedIcon fontSize="small" />
            &nbsp;Logout
          </h1>
        </div>
        <HamburgerButton
          toggled={props.toggled}
          click={props.handleToggler}
        />
      </div>
    </div>
  );
};

export default NavigationBar;

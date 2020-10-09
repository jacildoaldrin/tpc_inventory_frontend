import React, { useContext } from "react";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

//context
import { NavigationContext } from "../../components/Contexts/Contexts";

//assets
import Logo from "../../assets/tpc_logo.jpg";
import UserImage from "../../assets/luka.jpg";

//components
import HamburgerButton from "../HamburgerButton/HamburgerButton";

import styles from "./NavigationBar.module.css";

const NavigationBar = (props) => {
  const { navigationHandler } = useContext(NavigationContext);
  return (
    <div className={styles["navbar"]}>
      <div className={styles["left-container"]}>
        <img src={Logo} alt="logo" className={styles["image"]} onClick={() => navigationHandler("/")}/>
        <div className={styles["navigation-items"]}>
          <span className={styles["navigation-item"]} onClick={() => navigationHandler("/orders")}>Orders</span>
          <span className={styles["navigation-item"]} onClick={() => navigationHandler("/transactions")}>Transactions</span>
          <span className={styles["navigation-item"]} onClick={() => navigationHandler("/products")}>Products</span>
          <span className={styles["navigation-item"]} onClick={() => navigationHandler("/suppliers")}>Suppliers</span>
          <span className={styles["navigation-item"]} onClick={() => navigationHandler("/storage")}>Storage</span>
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
          open={props.open}
          close={props.close}
        />
      </div>
    </div>
  );
};

export default NavigationBar;

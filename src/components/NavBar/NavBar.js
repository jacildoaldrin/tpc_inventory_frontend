import React from "react";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

//context
import { useAuth } from "contexts/AuthContext";

//assets
import Logo from "assets/tpc_logo.jpg";
import UserImage from "assets/luka.jpg";

//components
import NavBarNavigationItems from "./NavBarNavigationItems/NavBarNavigationItems";

import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const { logout } = useAuth();

  return (
    <div className={styles["navbar"]}>
      <div className={styles["left-container"]}>
        <NavLink to="/" className={styles["image"]}>
          <img src={Logo} alt="logo" className={styles["image"]} />
        </NavLink>

        <NavBarNavigationItems />
      </div>
      <div className={styles["right-container"]}>
        <img src={UserImage} alt="user" className={styles["user-image"]} />
        <div className={styles["user-info"]}>
          <h1 className={styles["name"]}>Duka Loncic</h1>
          <h1 className={styles["logout"]} onClick={() => logout()}>
            <ExitToAppOutlinedIcon fontSize="small" />
            &nbsp;Logout
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

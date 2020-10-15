import React from "react";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { useHistory } from "react-router-dom";

//context
import { useAuth } from "contexts/AuthContext";

//assets
import Logo from "assets/tpc_logo.jpg";
import UserImage from "assets/luka.jpg";

//components
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import NavBarNavigationItems from "./NavBarNavigationItems/NavBarNavigationItems";

import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  const { logout } = useAuth();
  const history = useHistory();

  const logoutHandler = async () => {
    await logout();
    history.replace("/");
  };

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
          <h1 className={styles["logout"]} onClick={() => logoutHandler()}>
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

export default NavBar;

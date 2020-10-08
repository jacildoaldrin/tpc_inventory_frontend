import React from "react";
import { Link, useHistory } from "react-router-dom";

// components
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import SideDrawer from "../../components/SideDrawer/SideDrawer";

import styles from "./Layout.module.css";

const Layout = (props) => {
  const history = useHistory();

  return (
    <>
      <SideDrawer />
      <div className={styles["layout"]}>
        <div className={styles["container"]}>
          <div className={styles["navbar"]}>
            <NavigationBar />
          </div>
          <div className={styles["main"]}>{props.children}</div>
          <div className={styles["footer"]}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

import React, { useState } from "react";

//context
import { NavigationProvider } from "contexts/NavigationContext";

//components
import NavBar from "components/NavBar/NavBar";
import Footer from "components/Footer/Footer";
import SideBar from "components/SideBar/SideBar";
import HamburgerButton from "components/HamburgerButton/HamburgerButton";

import styles from "./Layout.module.css";
import { SnackbarProvider } from "contexts/SnackbarContext";

const Layout = (props) => {
  const [toggled, setToggled] = useState(false);

  const openSideBar = () => {
    setToggled(true);
  };

  const closeSideBar = () => {
    setToggled(false);
  };

  return (
    <NavigationProvider>
      <SnackbarProvider>
        <HamburgerButton
          toggled={toggled}
          open={openSideBar}
          close={closeSideBar}
        />
        <SideBar toggled={toggled} open={openSideBar} close={closeSideBar} />
        <div className={styles["layout"]}>
          <div className={styles["container"]}>
            <div className={styles["navbar"]}>
              <NavBar
                toggled={toggled}
                open={openSideBar}
                close={closeSideBar}
              />
            </div>
            <div className={styles["main"]}>{props.children}</div>
            <div className={styles["footer"]}>
              <Footer />
            </div>
          </div>
        </div>
      </SnackbarProvider>
    </NavigationProvider>
  );
};

export default Layout;

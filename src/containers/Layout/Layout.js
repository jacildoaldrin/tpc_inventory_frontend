import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// context
import { NavigationContext } from "../../components/Contexts/Contexts";

// components
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import SideBar from "../../components/SideBar/SideBar";

import styles from "./Layout.module.css";

const Layout = (props) => {
  const [toggled, setToggled] = useState(false);
  const history = useHistory();

  const openSideBar = () => {
    setToggled(true);
  };

  const closeSideBar = () => {
    setToggled(false);
  };

  const navigationHandler = (route) => {
    history.push(route);
  };

  return (
    <NavigationContext.Provider value={{ navigationHandler }}>
      <SideBar toggled={toggled} open={openSideBar} close={closeSideBar} />
      <div className={styles["layout"]}>
        <div className={styles["container"]}>
          <div className={styles["navbar"]}>
            <NavigationBar
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
    </NavigationContext.Provider>
  );
};

export default Layout;

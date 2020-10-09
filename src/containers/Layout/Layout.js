import React, { useState } from "react";

// components
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import SideBar from "../../components/SideBar/SideBar";

import styles from "./Layout.module.css";

const Layout = (props) => {
  const [toggled, setToggled] = useState(false);

  const handleToggler = () => {
    setToggled(!toggled);
  };

  return (
    <>
      <SideBar toggled={toggled} handleToggler={handleToggler}/>
      <div className={styles["layout"]}>
        <div className={styles["container"]}>
          <div className={styles["navbar"]}>
            <NavigationBar toggled={toggled} handleToggler={handleToggler}/>
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

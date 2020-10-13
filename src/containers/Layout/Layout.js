import React, { useState } from "react";
import { useHistory, Switch, Route, useRouteMatch } from "react-router-dom";

//context
import { NavigationContext } from "../../contexts/Contexts";

//components
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import SideBar from "../../components/SideBar/SideBar";

//containers
import Dashboard from "../Dashboard/Dashboard";
import Orders from "../Orders/Orders";
import Transactions from "../Transactions/Transactions";
import Products from "../Products/Products";
import Suppliers from "../Suppliers/Suppliers";
import Storage from "../Storage/Storage";

import styles from "./Layout.module.css";

const Layout = () => {
  let { path } = useRouteMatch();
  const [toggled, setToggled] = useState(false);
  const history = useHistory();

  const openSideBar = () => {
    setToggled(true);
  };

  const closeSideBar = () => {
    setToggled(false);
  };

  const navigationHandler = (route) => {
    history.push(path + route);
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
          <div className={styles["main"]}>
            <Switch>
              <Route exact path={`${path}`} component={Dashboard} />
              <Route exact path={`${path}/orders`} component={Orders} />
              <Route exact path={`${path}/transactions`} component={Transactions} />
              <Route exact path={`${path}/products`} component={Products} />
              <Route exact path={`${path}/suppliers`} component={Suppliers} />
              <Route exact path={`${path}/storage`} component={Storage} />
            </Switch>
          </div>
          <div className={styles["footer"]}>
            <Footer />
          </div>
        </div>
      </div>
    </NavigationContext.Provider>
  );
};

export default Layout;

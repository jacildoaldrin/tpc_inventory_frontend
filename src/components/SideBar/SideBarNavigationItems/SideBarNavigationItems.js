import React from "react";
import List from "@material-ui/core/List";

//context
import { useAuth } from "contexts/AuthContext";

//components
import SideBarNavigationItem from "./SideBarNavigationItem/SideBarNavigationItem";

//MUI ICONS
import ListAltIcon from "@material-ui/icons/ListAlt";
import ReorderIcon from "@material-ui/icons/Reorder";
import AppsIcon from "@material-ui/icons/Apps";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import styles from "./SideBarNavigationItems.module.css";

const SideBarNavigationItems = (props) => {
  const { logout } = useAuth();

  const handleClick = () => {
    props.close();
  };

  return (
    <div className={styles["container"]}>
      <List className={styles["navigation-items"]}>
        <SideBarNavigationItem
          name="ORDERS"
          click={() => handleClick()}
          route="/orders"
        >
          <ListAltIcon />
        </SideBarNavigationItem>
        <SideBarNavigationItem
          name="TRANSACTIONS"
          click={() => handleClick()}
          route="/transactions"
        >
          <ReorderIcon />
        </SideBarNavigationItem>
        <SideBarNavigationItem
          name="PRODUCTS"
          click={() => handleClick()}
          route="/products"
        >
          <AppsIcon />
        </SideBarNavigationItem>
        <SideBarNavigationItem
          name="SUPPLIERS"
          click={() => handleClick()}
          route="/suppliers"
        >
          <PeopleOutlineIcon />
        </SideBarNavigationItem>
        <SideBarNavigationItem
          name="STORAGE"
          click={() => handleClick()}
          route="/storage"
        >
          <StorefrontIcon />
        </SideBarNavigationItem>
      </List>
      <div className={styles["logout-button"]} onClick={() => logout()}>
        <ExitToAppIcon />
        &nbsp; LOGOUT
      </div>
    </div>
  );
};

export default SideBarNavigationItems;

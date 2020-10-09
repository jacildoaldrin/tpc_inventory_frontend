import React from "react";
import List from "@material-ui/core/List";

import AppsIcon from "@material-ui/icons/Apps";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ReorderIcon from "@material-ui/icons/Reorder";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import StorefrontIcon from '@material-ui/icons/Storefront';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import styles from "./SideBarNavigationItems.module.css";

const SideBarNavigationItems = (props) => {
  return (
    <div className={styles["container"]}>
      <List className={styles["navigation-items"]}>
        <div className={styles["navigation-item"]}>
          <ListAltIcon />
          &nbsp;&nbsp;&nbsp; ORDERS
        </div>

        <div className={styles["navigation-item"]}>
          <ReorderIcon />
          &nbsp;&nbsp;&nbsp; TRANSACTIONS
        </div>

        <div className={styles["navigation-item"]}>
          <AppsIcon />
          &nbsp;&nbsp;&nbsp; PRODUCTS
        </div>

        <div className={styles["navigation-item"]}>
          <PeopleOutlineIcon />
          &nbsp;&nbsp;&nbsp; SUPPLIERS
        </div>

        <div className={styles["navigation-item"]}>
          <StorefrontIcon />
          &nbsp;&nbsp;&nbsp; STORAGE
        </div>
      </List>
      <div className={styles["logout-button"]}>
        <ExitToAppIcon />
        &nbsp; LOGOUT
      </div>
    </div>
  );
};

export default SideBarNavigationItems;

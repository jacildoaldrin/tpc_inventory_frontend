import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";

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
  const [activeItem, setActiveItem] = useState("");
  const history = useHistory();

  const handleClick = (route, itemName) => {
    setActiveItem(itemName);
    history.push(route);
    props.close();
    console.log("rendering....");
  };

  return (
    <div className={styles["container"]}>
      <List className={styles["navigation-items"]}>
        <SideBarNavigationItem
          activeItem={activeItem}
          name="ORDERS"
          click={() => handleClick("/orders", "ORDERS")}
        >
          <ListAltIcon />
        </SideBarNavigationItem>
        <SideBarNavigationItem
          activeItem={activeItem}
          name="TRANSACTIONS"
          click={() => handleClick("/transactions", "TRANSACTIONS")}
        >
          <ReorderIcon />
        </SideBarNavigationItem>
        <SideBarNavigationItem
          activeItem={activeItem}
          name="PRODUCTS"
          click={() => handleClick("/products", "PRODUCTS")}
        >
          <AppsIcon />
        </SideBarNavigationItem>
        <SideBarNavigationItem
          activeItem={activeItem}
          name="SUPPLIERS"
          click={() => handleClick("/suppliers", "SUPPLIERS")}
        >
          <PeopleOutlineIcon />
        </SideBarNavigationItem>
        <SideBarNavigationItem
          activeItem={activeItem}
          name="STORAGE"
          click={() => handleClick("/storage", "STORAGE")}
        >
          <StorefrontIcon />
        </SideBarNavigationItem>
      </List>
      <div
        className={styles["logout-button"]}
        onClick={() => handleClick("/login")}
      >
        <ExitToAppIcon />
        &nbsp; LOGOUT
      </div>
    </div>
  );
};

export default SideBarNavigationItems;

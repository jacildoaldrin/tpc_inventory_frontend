import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavBarNavigationItems.module.css";

const NavBarNavigationItems = (props) => {
  return (
    <div className={styles["navigation-items"]}>
      <NavLink className={styles["navigation-item"]} to={"/orders"} activeClassName={`${styles['navigation-item']} ${styles['active']}`}>
        Orders
      </NavLink>
      <NavLink className={styles["navigation-item"]} to={"/transactions"} activeClassName={`${styles['navigation-item']} ${styles['active']}`}>
        Transactions
      </NavLink>
      <NavLink className={styles["navigation-item"]} to={"/products"} activeClassName={`${styles['navigation-item']} ${styles['active']}`}>
        Products
      </NavLink>
      <NavLink className={styles["navigation-item"]} to={"/suppliers"} activeClassName={`${styles['navigation-item']} ${styles['active']}`}>
        Suppliers
      </NavLink>
      <NavLink className={styles["navigation-item"]} to={"/storages"} activeClassName={`${styles['navigation-item']} ${styles['active']}`}>
        Storage
      </NavLink>
    </div>
  );
};

export default NavBarNavigationItems;

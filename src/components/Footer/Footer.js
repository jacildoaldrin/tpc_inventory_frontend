import React from "react";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles["footer"]}>
      <h1 className={styles['copyright']}>Copyright @ Teambits 2020</h1>
    </div>
  );
};

export default Footer;

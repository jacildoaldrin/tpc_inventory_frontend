import React from "react";

import styles from "./Backdrop.module.css";

const Backdrop = (props) => {
  return (
    <div
      className={
        props.show
          ? `${styles["backdrop"]} ${styles["visible"]}`
          : styles["backdrop"]
      }
      onClick={() => props.close()}
    />
  );
};

export default Backdrop;

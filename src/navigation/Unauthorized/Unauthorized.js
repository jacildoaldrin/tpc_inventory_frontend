import React from "react";
import { Link } from "react-router-dom";

import styles from "./Unauthorized.module.scss";

const Unauthorized = () => {
  return (
    <div className={styles["unauthorized"]}>
      <div className={styles["gandalf"]}>
        <div className={styles["fireball"]} />
        <div className={styles["skirt"]} />
        <div className={styles["sleeves"]} />
        <div className={styles["shoulders"]}>
          <div className={`${styles["hand"]} ${styles["left"]}`} />
          <div className={`${styles["hand"]} ${styles["right"]}`} />
        </div>
        <div className={styles["head"]}>
          <div className={styles["hair"]} />
          <div className={styles["beard"]} />
        </div>
      </div>
      <div className={styles["message"]}>
        <h1>403 - You Shall Not Pass</h1>
        <p>
          Uh oh, Gandalf is blocking the way!
          <br />
          Maybe you have a typo in the url? Or you meant to go to a different
          location? Like...Hobbiton?
        </p>
      </div>
      <div style={{paddingTop: "20px"}}>
        <Link to="/">Back to Login.</Link>
      </div>
    </div>
  );
};

export default Unauthorized;

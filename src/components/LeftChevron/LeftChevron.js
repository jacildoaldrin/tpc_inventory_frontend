import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import styles from "./LeftChevron.module.css";

const LeftChevron = (props) => {
  return (
    <div className={styles["chevron-container"]}>
      <ChevronLeftIcon
        onClick={() => props.click()}
        style={{ fontSize: "50px", cursor: "pointer" }}
      />
    </div>
  );
};

export default LeftChevron;

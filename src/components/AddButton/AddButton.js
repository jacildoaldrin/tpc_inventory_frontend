import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import styles from "./AddButton.module.css";

const AddButton = (props) => {
  return (
    <div className={styles["button-container"]}>
      <div className={styles["button"]} onClick={() => props.showModal()}>
        <AddCircleOutlineIcon />
        &nbsp; {props.children}
      </div>
    </div>
  );
};

export default AddButton;

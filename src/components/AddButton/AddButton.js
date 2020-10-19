import React from "react";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import styles from "./AddButton.module.css";

const AddButton = (props) => {
  return (
    <div className={styles["button-container"]}>
      <Link to={props.route} className={styles["button"]}>
        <AddCircleOutlineIcon />
        &nbsp; {props.children}
      </Link>
    </div>
  );
};

export default AddButton;

import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

//context
import { useNavigation } from "contexts/NavigationContext";

import styles from "./LeftChevron.module.css";

const LeftChevron = () => {
  const { goBack } = useNavigation();
  return (
    <div className={styles["chevron-container"]}>
      <ChevronLeftIcon
        onClick={() => goBack()}
        style={{ fontSize: "50px", cursor: "pointer" }}
      />
    </div>
  );
};

export default LeftChevron;

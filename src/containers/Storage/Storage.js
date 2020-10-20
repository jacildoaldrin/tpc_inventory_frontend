import AddButton from "components/AddButton/AddButton";
import StorageTable from "components/Tables/StorageTable/StorageTable";
import { StorageProvider } from "contexts/StorageContext";
import React from "react";
// import { Route, useRouteMatch } from "react-router-dom";

import styles from "./Storage.module.css";

const Storage = () => {
  return (
    <StorageProvider>
      {/* <div className={styles['storage']}>
        <h1>Storage</h1>
      </div> */}
      <StorageTable />
    </StorageProvider>
  );
};

export default Storage;

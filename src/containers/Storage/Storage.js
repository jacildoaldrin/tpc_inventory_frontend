import StorageTable from "components/Tables/StorageTable/StorageTable";
import StorageDetails from "components/Details/StorageDetails/StorageDetails";
import { StorageProvider } from "contexts/StorageContext";
import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
// import { Route, useRouteMatch } from "react-router-dom";

import styles from "./Storage.module.css";

const Storage = () => {
  let match = useRouteMatch();
  return (
    <StorageProvider>
      <div className={styles["storage"]}>
        <Route exact path={`${match.url}/`} component={()=><StorageTable />} />
        <Route path={`${match.url}/storage-details/:storage_id`} component={()=><StorageDetails />}/>
      </div>
    </StorageProvider>
  );
};

export default Storage;

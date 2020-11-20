import StorageTable from "components/Tables/StorageTable/StorageTable";
import StorageDetails from "components/Details/StorageDetails/StorageDetails";
import { StorageProvider } from "contexts/StorageContext";
import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
// import { Route, useRouteMatch } from "react-router-dom";

import styles from "./Storage.module.css";
import Pull from "components/ProductActions/Pull";
import { ProductsProvider } from "contexts/ProductsContext";

const Storage = () => {
  let match = useRouteMatch();
  return (
    <StorageProvider>
      <ProductsProvider>
        <div className={styles["storage"]}>
          <Route exact path={`${match.url}/`} component={()=><StorageTable />} />
          <Route path={`${match.url}/storage-details/:storage_id`} component={()=><StorageDetails />}/>
          <Route path={`${match.url}/storage/:storage_id/pull/:product_id`} component={Pull}/>
        </div>
      </ProductsProvider>
    </StorageProvider>
  );
};

export default Storage;

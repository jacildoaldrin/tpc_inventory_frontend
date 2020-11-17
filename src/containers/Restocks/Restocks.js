import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

import styles from "./Restocks.module.css";

// context
import { RestocksProvider } from "contexts/RestocksContext";

// components
import RestocksTable from "components/Tables/RestocksTable/RestocksTable";
import AddRestock from "components/Forms/AddRestock/AddRestock";
import AddButton from "components/AddButton/AddButton";
import { ProductsProvider } from "contexts/ProductsContext";
import { SuppliersProvider } from "contexts/SuppliersContext";

const Restocks = () => {
  let match = useRouteMatch();

  return (
    <ProductsProvider>
      <SuppliersProvider>
        <RestocksProvider>
          <div className={styles["restocks"]}>
            <Route exact path={`${match.url}/`}>
              <AddButton route={`${match.url}/add-restock`}>Restock</AddButton>
              <RestocksTable />
            </Route>
            <Route path={`${match.url}/add-restock`}>
              <AddRestock />
            </Route>
          </div>
        </RestocksProvider>
      </SuppliersProvider>
    </ProductsProvider>
  );
};

export default Restocks;

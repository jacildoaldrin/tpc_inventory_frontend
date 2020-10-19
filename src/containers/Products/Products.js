import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

//context
import { ProductsProvider } from "contexts/ProductsContext";

//components
import ProductsTable from "components/Tables/ProductsTable/ProductsTable";

import styles from "./Products.module.css";

const Products = () => {
  let match = useRouteMatch();

  return (
    <ProductsProvider>
      <div className={styles["products"]}>
        <Route exact path={`${match.url}/`}>
          <ProductsTable />
        </Route>
      </div>
    </ProductsProvider>
  );
};

export default Products;

import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

//context
import { ProductsProvider } from "contexts/ProductsContext";

//components
import ProductsTable from "components/Tables/ProductsTable/ProductsTable";
import AddButton from "components/AddButton/AddButton";
import ProductDetails from "components/Details/ProductDetails/ProductDetails";

import styles from "./Products.module.css";

const Products = () => {
  let match = useRouteMatch();

  return (
    <ProductsProvider>
      <div className={styles["products"]}>
        <Route exact path={`${match.url}/`}>
          <AddButton route={`${match.url}/add-product`}>Add Product</AddButton>
          <ProductsTable />
        </Route>
        <Route path={`${match.url}/add-product`}>
          <h1>add product</h1>
        </Route>
        <Route path={`${match.url}/product-details/:product_id`}>
          <ProductDetails />
        </Route>
      </div>
    </ProductsProvider>
  );
};

export default Products;

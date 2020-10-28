import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

//context
import { ProductsProvider } from "contexts/ProductsContext";

//components
import AddButton from "components/AddButton/AddButton";
import AddProductForm from "components/Forms/AddProduct/AddProduct";
import ProductsTable from "components/Tables/ProductsTable/ProductsTable";
import ProductDetails from "components/Details/ProductDetails/ProductDetails";
import EditProduct from "components/Forms/EditProduct/EditProduct";

import styles from "./Products.module.css";
import Push from "components/ProductActions/Push";
import { StorageProvider } from "contexts/StorageContext";

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
          <AddProductForm />
        </Route>
        <Route path={`${match.url}/edit-product/:product_id`}>
          <EditProduct />
        </Route>
        <Route path={`${match.url}/product-details/:product_id`}>
          <ProductDetails />
        </Route>
        <StorageProvider>
          <Route path={`${match.url}/push/:product_id`} component={Push} />
        </StorageProvider>
      </div>
    </ProductsProvider>
  );
};

export default Products;

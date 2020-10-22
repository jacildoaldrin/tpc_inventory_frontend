import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

//context
import { SuppliersProvider } from "contexts/SuppliersContext";

//components
import SuppliersTable from "components/Tables/SuppliersTable/SuppliersTable";
import AddButton from "components/AddButton/AddButton";

//form
import AddSupplier from "components/Forms/AddSupplier/AddSupplier";

import styles from "./Suppliers.module.css";
import SupplierDetails from "components/Details/SupplierDetails/SupplierDetails";

const Suppliers = () => {
  let match = useRouteMatch();

  return (
    <SuppliersProvider>
      <div className={styles["suppliers"]}>
        <Route exact path={`${match.url}/`}>
          <AddButton route={`${match.url}/add-supplier`}>
            Add Supplier
          </AddButton>
          <SuppliersTable />
        </Route>
        <Route path={`${match.url}/add-supplier`}>
          <AddSupplier />
        </Route>
        <Route path={`${match.url}/supplier-details/:supplier_id`}>
          <SupplierDetails />
        </Route>
      </div>
    </SuppliersProvider>
  );
};

export default Suppliers;

import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

//context
import { SuppliersProvider } from "contexts/SuppliersContext";

//components
import SuppliersTable from "components/Tables/SuppliersTable/SuppliersTable";
import AddButton from "components/AddButton/AddButton";

//form
import AddSupplierForm from "components/Forms/AddSupplierForm/AddSupplierForm";

import styles from "./Suppliers.module.css";

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
          <AddSupplierForm />
        </Route>
      </div>
    </SuppliersProvider>
  );
};

export default Suppliers;

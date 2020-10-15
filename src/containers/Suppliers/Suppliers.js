import React from "react";

//context
import { SuppliersProvider } from "contexts/SuppliersContext";

//components
import SuppliersTable from "components/Tables/SuppliersTable/SuppliersTable";

import styles from "./Suppliers.module.css";

const Suppliers = () => {
  return (
    <SuppliersProvider>
      <div className={styles["suppliers"]}>
        <SuppliersTable/>
      </div>
    </SuppliersProvider>
  );
};

export default Suppliers;

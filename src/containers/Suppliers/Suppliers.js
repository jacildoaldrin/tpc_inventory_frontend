import React, { useState } from "react";

//context
import { SuppliersProvider } from "contexts/SuppliersContext";

//components
import SuppliersTable from "components/Tables/SuppliersTable/SuppliersTable";
import CreateSupplierModal from "components/Modals/CreateSupplierModal/CreateSupplierModal";
import AddButton from "components/AddButton/AddButton";

import styles from "./Suppliers.module.css";

const Suppliers = () => {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  return (
    <SuppliersProvider>
      <CreateSupplierModal show={show} hideModal={hideModal} />
      <div className={styles["suppliers"]}>
        <AddButton showModal={showModal}>Add Supplier</AddButton>
        <SuppliersTable />
      </div>
    </SuppliersProvider>
  );
};

export default Suppliers;

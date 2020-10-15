import React from "react";

//component
import Backdrop from "components/Backdrop/Backdrop";

import styles from "./CreateSupplierModal.module.css";

const CreateSupplierModal = (props) => {
  return (
    <>
      <Backdrop show={props.show} close={props.hideModal} />
      {props.show ? (
        <div className={styles["container"]}>
          <form className={styles["form"]}>
            <div>
              <h1>Add Supplier</h1>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default CreateSupplierModal;

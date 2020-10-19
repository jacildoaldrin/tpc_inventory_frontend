import React from "react";
import LeftChevron from "components/LeftChevron/LeftChevron";

import styles from "./AddProduct.module.css";

const AddProduct = (props) => {
  return (
    <div className={styles['add-product']}>
      <LeftChevron />
      <h1>Add Product Form</h1>
    </div>
  );
};

export default AddProduct;

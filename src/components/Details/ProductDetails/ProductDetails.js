import React from "react";
import { useLocation } from "react-router-dom";

import styles from "./ProductDetails.module.css";

const ProductDetails = (props) => {
  const location = useLocation();
  return (
    <div className={styles["product-details"]}>
      <h1>Product Details</h1>
      {JSON.stringify(location.product_details)}
    </div>
  );
};

export default ProductDetails;

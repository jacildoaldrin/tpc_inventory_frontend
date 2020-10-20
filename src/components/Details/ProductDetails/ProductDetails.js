import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";

//context
import { useProducts } from "contexts/ProductsContext";
import LeftChevron from "components/LeftChevron/LeftChevron";

const ProductDetails = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const { getProductDetails } = useProducts();

  useEffect(() => {
    async function getProduct() {
      let product = await getProductDetails(product_id);
      setProduct(product);
    }
    getProduct();
  }, [product_id, getProductDetails]);

  return (
    <div>
      <LeftChevron />
      <div className={styles["product-details"]}>
        <h1>PRODUCT DETAILS</h1>
        <p>{JSON.stringify(product)}</p>
      </div>
    </div>
  );
};

export default ProductDetails;

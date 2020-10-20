import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";

//context
import { useProducts } from "contexts/ProductsContext";
import LeftChevron from "components/LeftChevron/LeftChevron";

const ProductDetails = (props) => {
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { getProductDetails } = useProducts();

  useEffect(() => {
    if (isLoading) {
      async function getProduct() {
        try {
          let product = await getProductDetails(product_id);
          setProduct(product);
        } catch (err) {
          console.log(err);
        }
      }
      getProduct();
    }
    setIsLoading(false);
  }, [isLoading, product_id, getProductDetails]);

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

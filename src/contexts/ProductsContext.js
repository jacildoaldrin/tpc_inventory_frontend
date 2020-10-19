import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ProductsContext = React.createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = (props) => {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  const viewProductDetails = async (id) => {
    let response = await axios.get(`http://localhost:8000/products/${id}`);
    let product = response.data;
    history.push({
      pathname: `/products/product-details/${id}`,
      product_details: { ...product },
    });
  };

  useEffect(() => {
    async function getProducts() {
      try {
        await axios
          .get("http://localhost:8000/products")
          .then((response) => setProducts(response.data));
      } catch (err) {
        console.log(err);
      }
    }
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, viewProductDetails }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

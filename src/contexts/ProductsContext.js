import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductsContext = React.createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = (props) => {
  const [products, setProducts] = useState([]);

  const getProductDetails = async (id) => {
    let data = null;
    try {
      let response = await axios.get(`http://localhost:8000/products/${id}`);
      data = response.data;
    } catch (err) {
      console.log(err);
    }
    return data;
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
    <ProductsContext.Provider value={{ products, getProductDetails }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

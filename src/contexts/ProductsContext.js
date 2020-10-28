import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import target from "api/api.target";

const ProductsContext = React.createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = (props) => {
  const [products, setProducts] = useState([]);

  const getProductDetails = async (id) => {
    let data = null;
    try {
      let response = await axios.get(`${target}/products/${id}`);
      data = response.data;
    } catch (err) {
      console.log(err);
    }
    return data;
  };

  async function getProducts() {
    try {
      await axios
        .get(`${target}/products`)
        .then((response) => setProducts(response.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, getProductDetails }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

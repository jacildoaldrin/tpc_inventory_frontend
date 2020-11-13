import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import target from "api/api.target";
import { useSpinner } from "./SpinnerContext"

const ProductsContext = React.createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = (props) => {
  const [products, setProducts] = useState([]);
  const { setIsLoading } = useSpinner();

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

  const getProductStorageDetails = async (id) => {
    let data = null;
    try {
      let response = await axios.get(
        `${target}/storages/getThisProductInAllStorages/${id}`
      );
      data = response.data;
    } catch (err) {
      console.log(err);
    }
    return data;
  };

  const addProduct = async (formdata, cb) => {
    try {
      await axios
        .post(`${target}/products`, formdata, {
          "content-type": "multipart/form-data",
        })
        .then((res) => console.log(res.data));
    } catch (err) {
      console.log(err);
      return;
    }
    await getProducts();
    return cb();
  };

  const editProduct = async (product_id, formdata, cb) => {
    try {
      await axios.put(`${target}/products/${product_id}`, formdata);
    } catch (err) {
      console.log(err);
      return;
    }
    await getProducts();
    return cb();
  };

  const getProducts = async () => {
    setIsLoading(true)
    try {
      await axios
        .get(`${target}/products`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("@token"),
          },
        })
        .then((response) => {setProducts(response.data)});
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(()=>{
        setIsLoading(false)
      }, 1000)
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        getProductDetails,
        getProductStorageDetails,
        addProduct,
        editProduct,
        getProducts,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

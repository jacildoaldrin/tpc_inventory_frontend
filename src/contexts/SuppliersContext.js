import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const SuppliersContext = React.createContext();

export const useSuppliers = () => {
  return useContext(SuppliersContext);
};

export const SuppliersProvider = (props) => {
  const [suppliers, setSuppliers] = useState([]);

  const getSupplierDetails = async (id) => {
    let data = null;
    try {
      let response = await axios.get(`http://localhost:8000/suppliers/${id}`);
      data = response.data;
    } catch (err) {
      console.log(err);
    }
    return data;
  };

  async function getSuppliers() {
    try {
      await axios
        .get("http://localhost:8000/suppliers")
        .then((response) => setSuppliers(response.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <SuppliersContext.Provider value={{ suppliers, getSupplierDetails }}>
      {props.children}
    </SuppliersContext.Provider>
  );
};

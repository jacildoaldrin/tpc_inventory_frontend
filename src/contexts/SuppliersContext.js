import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import target from "api/api.target";

const SuppliersContext = React.createContext();

export const useSuppliers = () => {
  return useContext(SuppliersContext);
};

export const SuppliersProvider = (props) => {
  const [suppliers, setSuppliers] = useState([]);

  const getSupplierDetails = async (id) => {
    let data = null;
    try {
      let response = await axios.get(`${target}/suppliers/${id}`);
      data = response.data;
    } catch (err) {
      console.log(err);
    }
    return data;
  };

  async function getSuppliers() {
    try {
      await axios
        .get(`${target}/suppliers`)
        .then((response) => setSuppliers(response.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <SuppliersContext.Provider value={{ suppliers, getSupplierDetails, getSuppliers }}>
      {props.children}
    </SuppliersContext.Provider>
  );
};

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const SuppliersContext = React.createContext();

export const useSuppliers = () => {
  return useContext(SuppliersContext);
};

export const SuppliersProvider = (props) => {
  const [suppliers, setSuppliers] = useState([]);

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
    <SuppliersContext.Provider value={{ suppliers }}>
      {props.children}
    </SuppliersContext.Provider>
  );
};

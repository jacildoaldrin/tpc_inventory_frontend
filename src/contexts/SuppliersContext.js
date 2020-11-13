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

  const addSupplier = async (supplierdata, cb) => {
    try {
      await axios.post(`${target}/suppliers/`, supplierdata).then((res) => {
        console.log(res);
      });
      getSuppliers();
      return cb();
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const removeSupplier = async (id, cb) => {
    try {
      await axios.delete(`${target}/suppliers/${id}`).then((res) => {
        console.log(res);
      });
      getSuppliers();
      return cb();
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const editSupplier = async (supplier_id, supplierdata, cb) => {
    try {
      await axios
        .put(`${target}/suppliers/${supplier_id}`, supplierdata)
        .then((res) => {
          console.log(res);
        });
      getSuppliers();
      return cb();
    } catch (err) {
      console.log(err);
      return;
    }
  };

  function getSuppliers() {
    try {
      axios
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
    <SuppliersContext.Provider
      value={{
        suppliers,
        getSupplierDetails,
        addSupplier,
        getSuppliers,
        editSupplier,
        removeSupplier,
      }}
    >
      {props.children}
    </SuppliersContext.Provider>
  );
};

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import target from "api/api.target";
import { useSpinner } from "./SpinnerContext"

const RestocksContext = React.createContext();

export const useRestocks = () => {
  return useContext(RestocksContext);
};

export const RestocksProvider = (props) => {
  const [restocks, setRestocks] = useState([]);
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const { setIsLoading } = useSpinner()

  async function getRestocks() {
    setIsLoading(true)
    try {
      await axios
        .get(`${target}/restocks`)
        .then((response) => {
          setIsLoading(false)
          setRestocks(response.data)
        });
    } catch (err) {
      console.log(err);
    }
  }

  const addRestock = async (formdata, cb) => {
    try {
      await axios
        .post(`${target}/restocks`, formdata)
        .then((res) => console.log(res.data));
    } catch (err) {
      console.log(err);
      return;
    }
    getRestocks();
    return cb();
  };

  useEffect(() => {
    getRestocks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RestocksContext.Provider
      value={{
        restocks,
        addRestock,
        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,
      }}
    >
      {props.children}
    </RestocksContext.Provider>
  );
};

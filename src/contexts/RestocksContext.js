import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import target from "api/api.target";

const RestocksContext = React.createContext();

export const useRestocks = () => {
  return useContext(RestocksContext);
};

export const RestocksProvider = (props) => {
  const [restocks, setRestocks] = useState([]);

  async function getRestocks() {
    try {
      await axios
        .get(`${target}/restocks`, {headers: {
          authorization: "Bearer " + localStorage.getItem("@token")
        }})
        .then((response) => setRestocks(response.data));
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
  }, []);

  return (
    <RestocksContext.Provider
      value={{
        restocks,
        addRestock,
      }}
    >
      {props.children}
    </RestocksContext.Provider>
  );
};

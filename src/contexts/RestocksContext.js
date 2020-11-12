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
        .get(`${target}/restocks`)
        .then((response) => setRestocks(response.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRestocks();
  }, [restocks]);

  return (
    <RestocksContext.Provider
      value={{
        restocks,
      }}
    >
      {props.children}
    </RestocksContext.Provider>
  );
};

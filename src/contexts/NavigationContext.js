import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

const NavigationContext = React.createContext();

export const useNavigation = () => {
  return useContext(NavigationContext);
};

export const NavigationProvider = (props) => {
  const history = useHistory();

  const navigateTo = (route) => {
    history.replace(route);
  };

  const viewDetails = (route) => {
    history.push(route);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <NavigationContext.Provider value={{ navigateTo, viewDetails, goBack }}>
      {props.children}
    </NavigationContext.Provider>
  );
};

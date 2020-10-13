import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//context
import { AuthenticationContext } from "./contexts";

//containers
import Login from "containers/Login/Login";
import Layout from "containers/Layout/Layout";

//navigation
import ProtectedRoute from "navigation/ProtectedRoute";
import Unauthorized from "navigation/Unauthorized/Unauthorized";

//theme
import MuiTheme from "themes/MuiTheme";

const App = () => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = (email, password, checked) => {
    setIsAuthenticated(true);
    history.replace("/tpc");
  };

  const logoutHandler = () => {
    setIsAuthenticated(false);
    history.replace("/");
  };
  
  console.log(history)

  return (
    <MuiThemeProvider theme={MuiTheme}>
      <AuthenticationContext.Provider
        value={{ isAuthenticated, loginHandler, logoutHandler }}
      >
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/unauthorized" component={Unauthorized} />
          <ProtectedRoute path="/tpc" component={Layout} />
        </Switch>
      </AuthenticationContext.Provider>
    </MuiThemeProvider>
  );
};

export default App;

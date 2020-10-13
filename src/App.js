import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import green from "@material-ui/core/colors/green";

//context
import { AuthenticationContext } from "./contexts/Contexts";

//containers
import Login from "./containers/Login/Login";
import Layout from "./containers/Layout/Layout";

//page
import Unauthorized from "./navigation/Unauthorized/Unauthorized";

//protected route
import ProtectedRoute from "./navigation/ProtectedRoute";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

const App = () => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = (email, password, checked) => {
    console.log(email, password, checked);
    setIsAuthenticated(true);
    history.push("/tpc");
  };

  const logoutHandler = () => {
    setIsAuthenticated(false);
  };

  return (
    <MuiThemeProvider theme={theme}>
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

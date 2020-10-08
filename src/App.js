import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import green from "@material-ui/core/colors/green";

//containers
import Login from "./containers/Login/Login";
import Layout from "./containers/Layout/Layout";
import Dashboard from "./containers/Dashboard/Dashboard";
import Orders from "./containers/Orders/Orders";
import Transactions from "./containers/Transactions/Transactions";
import Products from "./containers/Products/Products";
import Suppliers from "./containers/Suppliers/Suppliers";
import Storage from "./containers/Storage/Storage";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Layout>
            <Route
              component={({ match }) => (
                <>
                  <Route path="/" component={Dashboard} exact />
                  <Route path="/orders" component={Orders} />
                  <Route path="/transactions" component={Transactions} />
                  <Route path="/products" component={Products} />
                  <Route path="/suppliers" component={Suppliers} />
                  <Route path="/storage" component={Storage} />
                </>
              )}
            />
          </Layout>
        </Switch>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

export default App;

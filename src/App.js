import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//context
import { useAuth } from "contexts/AuthContext";

//containers
import Login from "containers/Login/Login";
import Layout from "containers/Layout/Layout";

//pages
import Dashboard from "containers/Dashboard/Dashboard";
import Orders from "containers/Orders/Orders";
import Transactions from "containers/Transactions/Transactions";
import Products from "containers/Products/Products";
import Suppliers from "containers/Suppliers/Suppliers";
import Storage from "containers/Storage/Storage";

//theme
import MuiTheme from "themes/MuiTheme";

const App = () => {
  const { currUser } = useAuth();
  return (
    <MuiThemeProvider theme={MuiTheme}>
      <BrowserRouter>
        <Switch>
          {currUser !== null ? (
            <Layout>
              <Route exact path="/" component={Dashboard} />
              <Route path="/orders" component={Orders} />
              <Route path="/transactions" component={Transactions} />
              <Route path="/products" component={Products} />
              <Route path="/suppliers" component={Suppliers} />
              <Route path="/storage" component={Storage} />
            </Layout>
          ) : (
            <Login />
          )}
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;

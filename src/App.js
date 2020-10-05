import React from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import green from "@material-ui/core/colors/green";

//containers
import Login from "./containers/Login/Login";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500]
    }
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Login />
    </MuiThemeProvider>
  );
};

export default App;

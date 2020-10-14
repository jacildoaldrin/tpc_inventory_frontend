import React  from "react";
import { Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//context
import { AuthProvider } from "contexts/AuthContext";

//containers
import Login from "containers/Login/Login";
import Layout from "containers/Layout/Layout";

//navigation
import ProtectedRoute from "navigation/ProtectedRoute";
import Unauthorized from "navigation/Unauthorized/Unauthorized";

//theme
import MuiTheme from "themes/MuiTheme";

// import { Users } from "models/Users";

const App = () => {
  // const history = useHistory();
  // const [user, setUser] = useState(null);

  // const loginHandler = async (email, password, checked) => {
  //   let data = await getUserInfo(email, password);
  //   if (data !== null) {
  //     setUser(data);
  //     history.replace("/tpc");
  //   } else {
  //     console.log("invalid email/password");
  //   }
  // };

  // const logoutHandler = async () => {
  //   history.replace("/");
  // };

  // const getUserInfo = (email, password) => {
  //   return new Promise((resolve) => {
  //     let data = null;
  //     Users.map((user) => {
  //       if (user.email === email && user.password === password) {
  //         data = user;
  //       }
  //     });
  //     setTimeout(() => {
  //       resolve(data);
  //     }, 3000);
  //   });
  // };

  return (
    <MuiThemeProvider theme={MuiTheme}>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/unauthorized" component={Unauthorized} />
          <ProtectedRoute path="/tpc" component={Layout} />
        </Switch>
      </AuthProvider>
    </MuiThemeProvider>
  );
};

export default App;

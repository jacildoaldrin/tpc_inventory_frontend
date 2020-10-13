import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

//context
import { AuthenticationContext } from "../contexts/Contexts";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/unauthorized", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;

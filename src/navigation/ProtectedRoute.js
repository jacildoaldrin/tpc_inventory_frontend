import React from "react";
import { Route, Redirect } from "react-router-dom";

//context
import { useAuth } from "contexts/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        currUser !== null ? (
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

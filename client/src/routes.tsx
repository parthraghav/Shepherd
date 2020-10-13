import React from "react";
import { Route, Redirect } from "react-router-dom";

const isLoggedIn = () => false;

export const PublicRoute = ({ component: Component, ...rest }: any) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export const ProtectedRoute = ({
  component: Component,
  restricted,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? (
          !restricted ? (
            <Component {...props} />
          ) : (
            <Redirect to="Home" />
          )
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export const ProxyRoute = ({ path, to }: any) => {
  return (
    <Route path={path}>
      <Redirect to={to} />
    </Route>
  );
};

import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PrivateRoute, ProxyRoute, PublicRoute } from "./routes";
import { HomeScreen, SettingScreen, WelcomeScreen } from "./screens";
import { Transition } from "react-transition-group";
import "./theme/styles.css";
import "./theme/shared.css";

const routes = [
  { path: "/welcome", component: WelcomeScreen, routeType: PublicRoute },
  { path: "/home", component: HomeScreen, routeType: PrivateRoute },
  { path: "/settings", component: SettingScreen, routeType: PrivateRoute },
];

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          {routes.map(({ path, component: Component, routeType: Route }) => (
            <Route key={path} exact path={path}>
              {({ match }: any) => (
                <Transition in={match !== null} timeout={300} unmountOnExit>
                  <Component shouldRender={match !== null} />
                </Transition>
              )}
            </Route>
          ))}
          <ProxyRoute path="/" to="/welcome" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

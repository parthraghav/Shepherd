import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { PrivateRoute, ProxyRoute, PublicRoute } from "./routes";
import { HomeScreen, SettingScreen, WelcomeScreen } from "./screens";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <PublicRoute path="/welcome" component={WelcomeScreen} />
          <PrivateRoute path="/home" component={HomeScreen} />
          <PrivateRoute path="/settings" component={SettingScreen} />
          <ProxyRoute path="/" to="/welcome" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

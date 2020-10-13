import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { PrivateRoute, ProxyRoute, PublicRoute } from "./routes";

const WelcomeScreen = () => <h1>Welcome Screen</h1>;
const HomeScreen = () => <h1>Home Screen</h1>;
const SettingScreen = () => <h1>Setting Screen</h1>;

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

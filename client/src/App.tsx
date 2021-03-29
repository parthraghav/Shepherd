import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute, ProxyRoute, PublicOnlyRoute } from "./routes";
import { HomeScreen, SettingScreen, WelcomeScreen } from "./screens";
import Screen from "./screens/screen";
import { Transition } from "react-transition-group";
import "./theme/styles.css";
import "./theme/shared.css";
import { FirebaseApp } from "./firebase";
import { Loader } from "@components";
import { LoaderState } from "@components/loader";
import { logout } from "@core/auth";

const routes = [
  { path: "/welcome", component: WelcomeScreen, routeType: PublicOnlyRoute },
  { path: "/home", component: HomeScreen, routeType: PrivateRoute },
  { path: "/settings", component: SettingScreen, routeType: PrivateRoute },
];

enum UserStatus {
  Unknown,
  LoggedIn,
  LoggedOut,
}

function App() {
  const [user, setUser] = useState(FirebaseApp.auth.currentUser);
  const [userStatus, setUserStatus] = useState(UserStatus.Unknown);
  FirebaseApp.auth.onAuthStateChanged(function (user) {
    setUser(user);
    if (user) {
      setUserStatus(UserStatus.LoggedIn);
    } else {
      setUserStatus(UserStatus.LoggedOut);
    }
  });

  return (
    <div className="app">
      {userStatus == UserStatus.Unknown ? (
        <Screen className={"welcome-screen progress"}>
          <div className="welcome-box">
            <div></div>
            <div className="welcome-loader-container">
              <Loader state={LoaderState.Progress} />
            </div>
            <div></div>
          </div>
        </Screen>
      ) : (
        <Router>
          <Switch>
            {routes.map(({ path, component: Component, routeType: CustomRoute }) => (
              <CustomRoute
                key={path}
                exact
                path={path}
                user={user}
                component={({ match }: any) => (
                  <Transition in={match !== null} timeout={300} unmountOnExit>
                    <Component />
                  </Transition>
                )}
              ></CustomRoute>
            ))}
            <ProxyRoute path="/" to="/welcome" />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;

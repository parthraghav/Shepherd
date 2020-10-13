import React, { useState } from "react";
import { Logo } from "@components/logo";
import Screen from "./screen";
import "./welcome_screen.css";
import { Button } from "@components/button";

enum WelcomeState {
  Uninitialized,
  Progress,
  Finished,
}

const WelcomeScreen = () => {
  const [welcomeState, setWelcomeState] = useState(WelcomeState.Uninitialized);
  return (
    <Screen className="welcome-screen">
      <div className="welcome-logo-container">
        <Logo />
      </div>
      <div className="welcome-box">
        <div className="welcome-desc-container">
          <span>Share your extra dollars weekly</span>
        </div>
        <div>
          <Button label="Login to continue" />
        </div>
      </div>
    </Screen>
  );
};

export default WelcomeScreen;

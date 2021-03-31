import { Button } from "@components";
import React from "react";
import "./onboarding_screen.css";
import Screen from "./screen";

const OnboardingScreen = () => {
  return (
    <Screen className="onboarding-screen">
      <div className="onboarding-header">
        <h1>Enrollment</h1>
        <p>
          Shepherd is a decentralized application that redistributes all donations equally amongst the enrolled members.
          Let's get started.
        </p>
      </div>
      <div className="onboarding-footer">
        <Button
          label="Enroll me"
          onClick={() => window.open("https://onboarding.io/download.html", "_blank")?.focus()}
        />
      </div>
    </Screen>
  );
};

export default OnboardingScreen;

import React, { useState } from "react";
import Screen from "./screen";
import "./setting_screen.css";
import { Button, Logo, VivianBox } from "@components";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";

const WelcomeVivianBox = (props: any) => (
  <VivianBox {...props} icon={faGlobeAmericas} primaryColor="2">
    <span className="text">Welcome back!</span>
    <div className="heading welcome-heading">
      <span>Parth</span>
    </div>
  </VivianBox>
);

const SettingScreen = () => {
  return (
    <Screen>
      <div className="setting-screen">
        <div className="app-header">
          <Logo />
        </div>
        <WelcomeVivianBox />
        <div className=""></div>
        <div className="setting-button-group">
          <Button label="Need help?" />
          <Button label="How does it work?" />
          <Button label="Contribute" />
          <Button label="Legal Information" />
          <Button label="Logout" />
        </div>
      </div>
    </Screen>
  );
};

export default SettingScreen;

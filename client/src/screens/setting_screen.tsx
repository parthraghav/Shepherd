import React, { useState } from "react";
import Screen from "./screen";
import "./setting_screen.css";
import { Button, FormButton, FormInput, Logo, VivianBox } from "@components";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { PaymentIcon } from "@components/payment_icon";

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
        <div className="form-group">
          <FormButton
            label="Payment Method"
            prompt="Ending in 3982"
            hint={<PaymentIcon type="mastercard" />}
          />
          <FormInput
            label="Your Need This Week"
            prompt="What’s your need?"
            prefix="USD"
            placeholder="$56"
            defaultValue="$56"
          />
          <div className="form-paragraph">
            <span>
              Please show your demonstrated need. WWR is a decentralized mutual
              aid platform, so all records are public. Please don’t lie!
            </span>
          </div>
          <FormInput
            label="Your Donation"
            prompt="Choose a weekly donation"
            prefix="USD"
            placeholder="$5"
            defaultValue="$5"
          />
          <FormInput
            label="Your Name"
            prompt="What's your name?"
            placeholder="Parth"
            defaultValue="Parth"
          />
        </div>
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

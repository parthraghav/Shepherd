import React, { useEffect, useRef, useState } from "react";
import Screen from "./screen";
import "./setting_screen.css";
import {
  Button,
  FormButton,
  FormInput,
  Logo,
  RadioButton,
  VivianBox,
} from "@components";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { PaymentIcon } from "@components/payment_icon";
import { useHistory, useLocation } from "react-router-dom";
import { TimelineMax, TweenMax } from "gsap";

const WelcomeVivianBox = ({ onCTAClick, ...rest }: any) => (
  <VivianBox
    {...rest}
    icon={faGlobeAmericas}
    onCTAClick={onCTAClick}
    primaryColor="2"
  >
    <span className="text">Welcome back!</span>
    <div className="heading welcome-heading">
      <span>Parth</span>
    </div>
  </VivianBox>
);

const SettingScreen = () => {
  const history = useHistory();
  const location: any = useLocation();
  const settingScreenRef: any = useRef<HTMLDivElement>();
  const goToHomeScreen = () => {
    const timeline = new TimelineMax({
      onComplete: () =>
        history.push("/home", { from: window.location.pathname }),
    });
    if (settingScreenRef.current != null) {
      timeline.to(
        settingScreenRef.current,
        {
          transform: "rotateY(70deg)",
        },
        0
      );
    }
  };

  useEffect(() => {
    settingScreenRef.current.style.display = "flex";

    if (settingScreenRef.current != null && location.state?.from == "/home") {
      TweenMax.fromTo(
        settingScreenRef.current,
        0.3,
        {
          transform: "rotateY(70deg)",
        },
        {
          transform: "rotateY(0deg)",
        }
      );
    }
  }, [TweenMax, location]);

  return (
    <Screen>
      <div
        ref={settingScreenRef}
        className="setting-screen"
        style={{ display: "none" }}
      >
        <div className="app-header">
          <Logo />
        </div>
        <WelcomeVivianBox onCTAClick={() => goToHomeScreen()} />
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
          <div className="radio-button-group">
            <RadioButton label="$5 (same as last week)" />
            <RadioButton label="$7.5 (50% more)" />
            <RadioButton label="$10 (100% more)" />
            <RadioButton label="$20 (300% more)" />
          </div>

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

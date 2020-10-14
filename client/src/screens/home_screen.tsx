import React from "react";
import Screen from "./screen";
import "./home_screen.css";
import { Logo, VivianBox } from "@components";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
const SummaryVivianBox = (props: any) => (
  <VivianBox {...props} icon={faSmile} primaryColor="1">
    <span className="text">We have redistributed</span>
    <div className="heading summary-heading">
      <span className="currency">USD</span>
      <span className="amount">3,490.38</span>
    </div>
  </VivianBox>
);

const HomeScreen = () => {
  return (
    <Screen>
      <div className="home-screen">
        <div className="app-header">
          <Logo />
        </div>
        <SummaryVivianBox />
        <div className=""></div>
      </div>
    </Screen>
  );
};

export default HomeScreen;

import { Button } from "@components";
import React from "react";
import "./metamask_screen.css";
import Screen from "./screen";

const MetamaskScreen = () => {
  return (
    <Screen className="metamask-screen">
      <div className="metamask-header">
        <h1>Download Metamask</h1>
        <p>
          To use the app, you should open it in a metamask browser. Make sure you've opened the app in
          <a href="https://metamask.io/download.html">Metamask</a>
        </p>
      </div>
      <div className="metamask-footer">
        <Button
          label="Download Metamask"
          onClick={() => window.open("https://metamask.io/download.html", "_blank")?.focus()}
        />
      </div>
    </Screen>
  );
};

export default MetamaskScreen;

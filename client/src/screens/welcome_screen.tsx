import React, { useRef, useState } from "react";
import { Logo, Button, Loader } from "@components";
import Screen from "./screen";
import "./welcome_screen.css";
import { useHistory } from "react-router-dom";
import { TimelineMax } from "gsap";
enum WelcomeState {
  Uninitialized,
  Progress,
  Finished,
}

const IntroFragment = ({ onCTAClick }: any) => (
  <>
    <div className="welcome-desc-container">
      <span>Share your extra dollars weekly</span>
    </div>
    <div>
      <Button label="Login to continue" onClick={onCTAClick} />
    </div>
  </>
);

const ProgressFragment = ({ state }: any) => (
  <>
    <div></div>
    <div className="welcome-loader-container">
      <Loader state={state} />
    </div>
    <div className="welcome-progress-desc-container">
      <span>You will be shortly redirected to Google Login Prompt...</span>
    </div>
  </>
);

const WelcomeScreen = ({ shouldRender }: any) => {
  const [welcomeState, setWelcomeState] = useState(WelcomeState.Uninitialized);
  const history = useHistory();
  const logoRef: any = useRef<HTMLDivElement>();
  const boxRef: any = useRef<HTMLDivElement>();
  const playUnmountAnimation = (callback: any) => {
    var tl = new TimelineMax({ onComplete: callback });
    if (logoRef != null && boxRef != null) {
      tl.to(
        logoRef.current,
        {
          css: {
            transform: "translate(0%, -100%)",
          },
        },
        0
      );
      tl.to(
        boxRef.current,
        {
          css: {
            transform: "translate(0%, 100%)",
          },
        },
        0
      );
    }
  };
  const handleClick = () => {
    setWelcomeState(WelcomeState.Progress);
    setTimeout(() => {
      setWelcomeState(WelcomeState.Finished);
      setTimeout(() => {
        playUnmountAnimation(() => history.push("/home"));
      }, 1000);
    }, 2000);
  };
  return (
    <Screen
      className={
        "welcome-screen" +
        " " +
        (welcomeState != WelcomeState.Uninitialized ? "progress" : "")
      }
    >
      <div ref={logoRef} className="welcome-logo-container">
        <Logo />
      </div>
      <div ref={boxRef} className="welcome-box">
        {welcomeState == WelcomeState.Uninitialized ? (
          <IntroFragment onCTAClick={handleClick} />
        ) : (
          <ProgressFragment state={welcomeState} />
        )}
      </div>
    </Screen>
  );
};

export default WelcomeScreen;

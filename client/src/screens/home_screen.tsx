import React, { useEffect, useRef, useState } from "react";
import Screen from "./screen";
import "./home_screen.css";
import {
  FormInput,
  Logo,
  RadioButton,
  TransactionBox,
  VivianBox,
} from "@components";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { Transactions } from "@data";
import { Transaction } from "@models";
import { TransactionBottomSheet } from "@components/transaction_bottom_sheet";
import { useHistory, useLocation } from "react-router-dom";
import { TimelineMax, TweenMax } from "gsap";

const SummaryVivianBox = ({ onCTAClick, ...rest }: any) => (
  <VivianBox {...rest} icon={faSmile} onCTAClick={onCTAClick} primaryColor="1">
    <span className="text">We have redistributed</span>
    <div className="heading summary-heading">
      <span className="currency">USD</span>
      <span className="amount">3,490.38</span>
    </div>
  </VivianBox>
);

const HomeScreen = () => {
  const [
    focusedTransaction,
    setFocusedTransaction,
  ] = useState<Transaction | null>();
  const [isModalFocused, setModalFocus] = useState<boolean>(false);

  const history = useHistory();
  const location: any = useLocation();
  const homeScreenRef: any = useRef<HTMLDivElement>();
  const goToSettingScreen = () => {
    const timeline = new TimelineMax({
      onComplete: () =>
        history.push("/settings", { from: window.location.pathname }),
    });
    if (homeScreenRef.current != null) {
      timeline.to(
        homeScreenRef.current,
        {
          transform: "rotateY(-70deg)",
        },
        0
      );
    }
  };

  useEffect(() => {
    homeScreenRef.current.style.display = "flex";
    if (homeScreenRef.current != null && location.state?.from == "/settings") {
      TweenMax.fromTo(
        homeScreenRef.current,
        0.3,
        {
          transform: "rotateY(-70deg)",
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
        ref={homeScreenRef}
        className="home-screen"
        style={{ display: "none" }}
      >
        <div className="app-header">
          <Logo />
        </div>
        <SummaryVivianBox onCTAClick={() => goToSettingScreen()} />
        <div className="">
          <FormInput
            label="Next week's Donation"
            prompt="50%+ last week"
            prefix="USD"
            placeholder="$7.5"
            defaultValue="$7.5"
            type="choose-next-donation"
          >
            <div className="radio-button-group">
              <RadioButton label="$5" />
              <RadioButton label="$7.5" />
              <RadioButton label="$10" />
              <RadioButton label="$20" />
            </div>
          </FormInput>

          {Transactions.map((transaction) => (
            <TransactionBox
              key={transaction.uuid}
              data={transaction}
              onClick={() => {
                setFocusedTransaction(transaction);
                setModalFocus(true);
              }}
            />
          ))}
        </div>
        {isModalFocused && (
          <TransactionBottomSheet
            transaction={focusedTransaction}
            close={() => setModalFocus(false)}
          />
        )}
      </div>
    </Screen>
  );
};

export default HomeScreen;

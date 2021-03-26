import React, { useEffect, useRef, useState } from "react";
import Screen from "./screen";
import "./home_screen.css";
import { Button, FormInput, Logo, RadioButton, TransactionBox, VivianBox } from "@components";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { Transaction } from "@models";
import { TransactionBottomSheet } from "@components/transaction_bottom_sheet";
import { useHistory, useLocation } from "react-router-dom";
import { TimelineMax, TweenMax } from "gsap";
import { getBaseInfo } from "@core/base";
import { getCurrencySymbol, getDisplayableNumber } from "@core/utils";
import { getMyTransactions } from "@core/transaction";
import { getMyInfo } from "@core/user";
import { donate } from "@core/redistributor";
import { web3 } from "@core/web3";

const SummaryVivianBox = ({ onCTAClick, ...rest }: any) => {
  const [baseInfo, setBaseInfo] = useState<any>();
  useEffect(() => {
    (async function fetchBaseInfo() {
      const fetchedBaseInfo = await getBaseInfo();
      console.log(fetchedBaseInfo);
      setBaseInfo(fetchedBaseInfo);
    })();
  }, []);
  return (
    <VivianBox {...rest} icon={faSmile} onCTAClick={onCTAClick} primaryColor="1">
      {baseInfo != null && (
        <>
          <span className="text">We have all received</span>
          <div className="heading summary-heading">
            <span className="currency">DAI</span>
            <span className="amount">{getDisplayableNumber(baseInfo?.totalRedistributedSum ?? 0)}</span>
          </div>
        </>
      )}
    </VivianBox>
  );
};

const HomeScreen = () => {
  const [myInfo, setMyInfo] = useState<any>();
  const [focusedTransaction, setFocusedTransaction] = useState<Transaction | null>();
  const [myTransactions, setMyTransactions] = useState<Transaction[]>([]);
  const [isModalFocused, setModalFocus] = useState<boolean>(false);
  const history = useHistory();
  const location: any = useLocation();
  const homeScreenRef: any = useRef<HTMLDivElement>();
  const goToSettingScreen = () => {
    const timeline = new TimelineMax({
      onComplete: () => history.push("/settings", { from: window.location.pathname }),
    });
    if (homeScreenRef.current != null) {
      timeline.to(
        homeScreenRef.current,
        {
          transform: "rotateY(-70deg)",
        },
        0,
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
        },
      );
    }
  }, [TweenMax, location]);

  useEffect(() => {
    (async function () {
      const myTransactions = await getMyTransactions();
      setMyTransactions(myTransactions);
      console.log(myTransactions);
    })();
    (async function fetchUserInfo() {
      const fetchedUserInfo = await getMyInfo();
      setMyInfo(fetchedUserInfo);
      console.log(fetchedUserInfo);
    })();
  }, []);

  return (
    <Screen>
      <div ref={homeScreenRef} className="home-screen" style={{ display: "none" }}>
        <div className="app-header">
          <Logo />
        </div>
        <SummaryVivianBox onCTAClick={() => goToSettingScreen()} />
        <div className="">
          <FormInput
            id="weeklyDonationNowInput"
            label="This week's Donation"
            prompt="Complete this week's donation"
            prefix="DAI"
            placeholder="123"
            inputType="number"
            defaultValue={0}
            type="choose-next-donation"
            inputStyleType="fullWidth"
            onSubmit={async (_amount: number) => {
              const amount = web3.utils.toWei(_amount.toString(), "ether");
              const result = await donate(myInfo.walletAddress, amount);
              console.log(result);
            }}
          >
            <div className="radio-button-group center">
              {Array(4)
                .fill(0)
                .map((_: any, index: number) => {
                  const initAmount = myInfo?.weeklyDonationAmount ?? 0;
                  const newAmount = initAmount + 2.5 * index * index;
                  const percentageIncreaseFromLastAmount = ((newAmount - initAmount) * 100) / initAmount;
                  return (
                    <RadioButton
                      onClick={() => {
                        // UNSAFE OPERATION (Calling getElementById is not a good practice)
                        const weeklyDonationAmountInput: any = document.getElementById("weeklyDonationNowInput");
                        if (!weeklyDonationAmountInput) return;
                        weeklyDonationAmountInput.value = newAmount;

                        // if ("createEvent" in document) {
                        //   var evt = document.createEvent("HTMLEvents");
                        //   evt.initEvent("change", false, true);
                        //   weeklyDonationAmountInput.dispatchEvent(evt);
                        // } else {
                        //   weeklyDonationAmountInput.fireEvent("onchange");
                        // }

                        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                          window.HTMLInputElement.prototype,
                          "value",
                        )?.set;
                        nativeInputValueSetter?.call(weeklyDonationAmountInput, newAmount);
                        var ev2 = new Event("input", { bubbles: true });
                        weeklyDonationAmountInput.dispatchEvent(ev2);
                      }}
                      key={index}
                      label={`${newAmount}`}
                    />
                  );
                })}
            </div>
          </FormInput>

          {myTransactions.map(transaction => (
            <TransactionBox
              key={transaction.id}
              data={transaction}
              onClick={() => {
                setFocusedTransaction(transaction);
                setModalFocus(true);
              }}
            />
          ))}
        </div>
        {isModalFocused && (
          <TransactionBottomSheet transaction={focusedTransaction} close={() => setModalFocus(false)} />
        )}
      </div>
    </Screen>
  );
};

export default HomeScreen;

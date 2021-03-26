import React, { useEffect, useRef, useState } from "react";
import Screen from "./screen";
import "./setting_screen.css";
import { Button, FormButton, FormInput, Logo, RadioButton, VivianBox } from "@components";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { PaymentIcon } from "@components/payment_icon";
import { useHistory, useLocation } from "react-router-dom";
import { TimelineMax, TweenMax } from "gsap";
import { logout } from "@core/auth";
import {
  enrollMe,
  getMyInfo,
  updateMyDemonstratedNeedAmount,
  updateMyName,
  updateMyWalletAddress,
  updateMyWeeklyDonationAmount,
} from "@core/user";
import { web3 } from "@core/web3";
import { getDaiBalance } from "@core/dai_token";

const WelcomeVivianBox = ({ onCTAClick, userInfo, ...rest }: any) => {
  const fullName = userInfo?.name ?? "";
  const firstName = fullName.split(" ")[0];
  return (
    <VivianBox {...rest} icon={faGlobeAmericas} onCTAClick={onCTAClick} primaryColor="2">
      <span className="text">Welcome back!</span>
      <div className="heading welcome-heading">
        <span>{firstName}</span>
      </div>
    </VivianBox>
  );
};

const SettingScreen = () => {
  const [myInfo, setMyInfo] = useState<any>();
  const [daiBalance, setDaiBalance] = useState<any>();
  const [availableAccounts, setAvailableAccounts] = useState<any>(["0x0"]);
  const history = useHistory();
  const location: any = useLocation();
  const settingScreenRef: any = useRef<HTMLDivElement>();
  const goToHomeScreen = () => {
    const timeline = new TimelineMax({
      onComplete: () => history.push("/home", { from: window.location.pathname }),
    });
    if (settingScreenRef.current != null) {
      timeline.to(
        settingScreenRef.current,
        {
          transform: "rotateY(70deg)",
        },
        0,
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
        },
      );
    }
  }, [TweenMax, location]);

  useEffect(() => {
    (async function fetchUserInfo() {
      const fetchedUserInfo = await getMyInfo();
      setMyInfo(fetchedUserInfo);
      console.log(fetchedUserInfo);
    })();

    (async function loadBlockchainData() {
      const accounts = await web3.eth.getAccounts();
      setAvailableAccounts([...availableAccounts, ...accounts]);
      console.log(accounts);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const walletAddress = myInfo?.walletAddress;
      if (!["0x0", undefined, ""].includes(walletAddress)) {
        const balance = await getDaiBalance(walletAddress);
        setDaiBalance(web3.utils.fromWei(balance, "ether"));
      }
    })();
  }, [myInfo]);

  return (
    <Screen>
      <div ref={settingScreenRef} className="setting-screen" style={{ display: "none" }}>
        <div className="app-header">
          <Logo />
        </div>
        <WelcomeVivianBox userInfo={myInfo} onCTAClick={() => goToHomeScreen()} />
        <div className="form-group">
          <FormButton
            label="Your Balance"
            prompt={daiBalance == undefined ? "Connecting..." : `${daiBalance} DAI`}
            hint={<PaymentIcon type="dai" />}
          />
          <FormInput
            label="Your Wallet"
            prompt="Select primary wallet"
            hint={<PaymentIcon type="dai" />}
            placeholder="Click to update account"
            inputStyleType="fullWidth"
            inputType="select"
            defaultValue={myInfo?.walletAddress}
            valueList={availableAccounts}
            onChange={async (newAccount: string) => {
              await updateMyWalletAddress(newAccount);
              window.location.reload();
            }}
          />

          <FormInput
            label="Your Need This Week"
            prompt="What’s your need?"
            prefix="DAI"
            placeholder="123"
            inputStyleType="fullWidth"
            inputType="number"
            defaultValue={myInfo?.demonstratedNeedAmount}
            onSubmit={async (newAmount: string) => {
              const amount = parseFloat(newAmount);
              await updateMyDemonstratedNeedAmount(amount);
              window.location.reload();
            }}
          />
          <div className="form-paragraph">
            <span>
              Please show your demonstrated need. WWR is a decentralized mutual aid platform, so all records are public.
              Please don’t lie!
            </span>
          </div>
          <FormInput
            id="weeklyDonationAmountInput"
            label="Your Donation"
            prompt="Choose a weekly donation"
            prefix="DAI"
            placeholder="123"
            inputStyleType="fullWidth"
            inputType="number"
            defaultValue={myInfo?.weeklyDonationAmount}
            onSubmit={async (newAmount: string) => {
              const amount = parseFloat(newAmount);
              await updateMyWeeklyDonationAmount(amount);
              window.location.reload();
            }}
          />
          <div className="radio-button-group">
            {Array(6)
              .fill(0)
              .map((_: any, index: number) => {
                const initAmount = myInfo?.weeklyDonationAmount ?? 0;
                const newAmount = initAmount + 2.5 * index * index;
                const percentageIncreaseFromLastAmount = ((newAmount - initAmount) * 100) / initAmount;
                return (
                  <RadioButton
                    onClick={() => {
                      // UNSAFE OPERATION (Calling getElementById is not a good practice)
                      const weeklyDonationAmountInput: any = document.getElementById("weeklyDonationAmountInput");
                      if (!weeklyDonationAmountInput) return;
                      weeklyDonationAmountInput.value = newAmount;
                      console.log();
                    }}
                    key={index}
                    label={
                      `${newAmount} DAI ` +
                      (percentageIncreaseFromLastAmount != 0
                        ? `(${percentageIncreaseFromLastAmount}% more)`
                        : "(same as last week)")
                    }
                  />
                );
              })}
          </div>

          <FormInput
            label="Your Name"
            prompt="What's your name?"
            placeholder="Your name"
            defaultValue={myInfo?.name}
            inputStyleType="fullWidth"
            onSubmit={async (newName: string) => {
              await updateMyName(newName);
              window.location.reload();
            }}
          />
        </div>
        <div className="setting-button-group">
          <Button
            label="Need help?"
            onClick={() => {
              window.location.href = `mailto:support@shepherd.so?subject=Issue | ${myInfo.name}-${myInfo.uid}`;
            }}
          />
          <Button
            label="Approve DAI"
            onClick={() =>
              (window.location.href =
                "https://kovan.etherscan.io/address/0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa#writeContract")
            }
          />
          <Button label="Enroll" onClick={() => enrollMe()} />
          <Button label="Logout" onClick={() => logout()} />
        </div>
      </div>
    </Screen>
  );
};

export default SettingScreen;

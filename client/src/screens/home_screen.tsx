import React, { useState } from "react";
import Screen from "./screen";
import "./home_screen.css";
import { Logo, TransactionBox, VivianBox } from "@components";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { Transactions } from "@data";
import { Transaction } from "@models";
import { TransactionBottomSheet } from "@components/transaction_bottom_sheet";

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
  const [
    focusedTransaction,
    setFocusedTransaction,
  ] = useState<Transaction | null>();
  const [isModalFocused, setModalFocus] = useState<boolean>(false);
  return (
    <Screen>
      <div className="home-screen">
        <div className="app-header">
          <Logo />
        </div>
        <SummaryVivianBox />
        <div className="">
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

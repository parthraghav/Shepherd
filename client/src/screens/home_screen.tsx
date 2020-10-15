import React, { useState } from "react";
import Screen from "./screen";
import "./home_screen.css";
import { BottomSheet, Logo, TransactionBox, VivianBox } from "@components";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { Transactions } from "@data";
import { Transaction } from "@models";
import {
  getCurrencySymbol,
  getDisplayableDate,
  getDisplayableNumber,
} from "@core/utils";

const SummaryVivianBox = (props: any) => (
  <VivianBox {...props} icon={faSmile} primaryColor="1">
    <span className="text">We have redistributed</span>
    <div className="heading summary-heading">
      <span className="currency">USD</span>
      <span className="amount">3,490.38</span>
    </div>
  </VivianBox>
);

const TransactionBottomSheet = ({ transaction, close, ...rest }: any) => {
  const transactionDate = getDisplayableDate(transaction.timestamp);
  const currencySymbol = getCurrencySymbol(transaction.currency);
  const transactionDescriptor =
    transaction.type == "Donated" ? "You → Public" : "Public → You";
  const { summary } = transaction;
  return (
    <BottomSheet
      close={close}
      primaryColor={
        transaction.type == "Donated" ? "var(--primary-1)" : "var(--primary-2)"
      }
    >
      <div className="transaction-bottom-sheet">
        <div className="transaction-descriptor">
          <span>
            {transaction.type == "Donated" ? "You donated!" : "You received!"}
          </span>
        </div>
        <div className="transaction-info">
          <div className="transaction-info-details">
            <div className="transaction-date">
              <span>{transactionDate}</span>
            </div>
            <div className="transaction-desc">
              <span>{transactionDescriptor}</span>
            </div>
            <div className="transaction-uuid">
              <span>{transaction.uuid.substr(0, 20)}</span>
            </div>
          </div>
          <div className="transaction-charge">
            <span>{currencySymbol}</span>
            <span>{transaction.amount}</span>
          </div>
        </div>
        <div className="transaction-summary">
          {summary.redistributionCount != undefined && (
            <div className="summary-row">
              <span>🌎</span>
              <span>
                The donation was redistributed to{" "}
                <b>
                  {getDisplayableNumber(summary.redistributionCount)} people
                </b>
                .
              </span>
            </div>
          )}
          {summary.donationMatchCount != undefined && (
            <div className="summary-row">
              <span>🙅‍♀️</span>
              <span>
                <b>{getDisplayableNumber(summary.donationMatchCount)} people</b>{" "}
                matched your donation.
              </span>
            </div>
          )}
          {summary.isFirstOfKind && (
            <div className="summary-row">
              <span>❤️</span>
              <span>
                {transaction.type == "Donated"
                  ? "This was your first donation!"
                  : "You received your first redistribution!"}
              </span>
            </div>
          )}
          {summary.donorCount != undefined && (
            <div className="summary-row">
              <span>🌎</span>
              <span>
                <b>{getDisplayableNumber(summary.donorCount)} people </b>
                donated for you.
              </span>
            </div>
          )}
          {summary.didMeetDemonstratedNeed && (
            <div className="summary-row">
              <span>🎉</span>
              <span>You met your demonstrated need!</span>
            </div>
          )}
        </div>
      </div>
    </BottomSheet>
  );
};

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

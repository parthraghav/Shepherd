import React from "react";

import {
  getCurrencySymbol,
  getDisplayableDate,
  getDisplayableNumber,
} from "@core/utils";
import { BottomSheet } from "./bottom_sheet";

export const TransactionBottomSheet = ({
  transaction,
  close,
  ...rest
}: any) => {
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
                <b>{getDisplayableDate(summary.redistributionCount)} people</b>.
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

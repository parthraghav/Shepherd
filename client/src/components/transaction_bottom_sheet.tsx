import React from "react";

import { getCurrencySymbol, getDisplayableDate, getDisplayableNumber } from "@core/utils";
import { BottomSheet } from "./bottom_sheet";
import { TransactionType } from "@models/transaction";

export const TransactionBottomSheet = ({ transaction, close, ...rest }: any) => {
  const transactionDate = getDisplayableDate(transaction.emittedAt);
  const currencySymbol = getCurrencySymbol(transaction.currency);
  const transactionDescriptor = transaction.type == TransactionType.Donation ? "You → Public" : "Public → You";
  const { analytics } = transaction;
  return (
    <BottomSheet
      close={close}
      primaryColor={transaction.type == TransactionType.Donation ? "var(--primary-1)" : "var(--primary-2)"}
    >
      <div className="transaction-bottom-sheet">
        <div className="transaction-descriptor">
          <span>{transaction.type == TransactionType.Donation ? "You donated!" : "You received!"}</span>
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
              <span>{transaction.id.substr(0, 20)}</span>
            </div>
          </div>
          <div className="transaction-charge">
            <span>{currencySymbol}</span>
            <span>{transaction.amount}</span>
          </div>
        </div>
        <div className="transaction-summary">
          {analytics.beneficiaryCount != undefined && (
            <div className="summary-row">
              <span>🌎</span>
              <span>
                Your donation was redistributed to <b>{getDisplayableNumber(analytics.beneficiaryCount)} people</b>.
              </span>
            </div>
          )}
          {analytics.isFirstOfType && (
            <div className="summary-row">
              <span>❤️</span>
              <span>
                {transaction.type == TransactionType.Donation
                  ? "This was your first donation!"
                  : "You received your first redistribution!"}
              </span>
            </div>
          )}
          {analytics.remitterCount != undefined && (
            <div className="summary-row">
              <span>✊</span>
              {transaction.type == TransactionType.Donation ? (
                <span>
                  <b>{getDisplayableNumber(analytics.remitterCount)} people</b> matched your donation.
                </span>
              ) : (
                <span>
                  <b>{getDisplayableNumber(analytics.remitterCount)} people </b>
                  donated for you.
                </span>
              )}
            </div>
          )}
          {analytics.didMeetDemonstratedNeed && (
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

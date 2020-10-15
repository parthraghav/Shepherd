import React from "react";
import { getCurrencySymbol, getDisplayableTime } from "@core/utils";

export const TransactionBox = ({ data: transaction, ...rest }: any) => {
  const displayableTime = getDisplayableTime(transaction.timestamp);
  const currencySymbol = getCurrencySymbol(transaction.currency);
  const transactionDescriptor =
    transaction.type == "Donated" ? "You → Public" : "Public → You";
  return (
    <div
      {...rest}
      className="transaction-box"
      style={{
        backgroundColor:
          transaction.type == "Donated"
            ? "var(--primary-1)"
            : "var(--primary-2)",
      }}
    >
      <div className="transaction-info">
        <div>
          <span>{displayableTime}</span>
        </div>
        <div>
          <span>{transactionDescriptor}</span>
        </div>
      </div>
      <div className="transaction-amount">
        <span>{currencySymbol}</span>
        <span>{transaction.amount}</span>
      </div>
    </div>
  );
};

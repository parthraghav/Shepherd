import React from "react";
import { getCurrencySymbol, getDisplayableTime } from "@core/utils";
import { TransactionType } from "@models/transaction";

export const TransactionBox = ({ data: transaction, ...rest }: any) => {
  const displayableTime = getDisplayableTime(transaction.timestamp);
  const currencySymbol = getCurrencySymbol(transaction.currency);
  const transactionType = transaction.type == 0 ? TransactionType.Donation : TransactionType.Redistribution;
  const transactionDescriptor = transactionType == TransactionType.Donation ? "You → Public" : "Public → You";
  return (
    <div
      {...rest}
      className="transaction-box"
      style={{
        backgroundColor: transactionType == TransactionType.Donation ? "var(--primary-1)" : "var(--primary-2)",
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
        <span>{currencySymbol} </span>
        <span>{transaction.amount}</span>
      </div>
    </div>
  );
};

import React from "react";
import "./styles.css";

import mastercard from "payment-icons/min/single/mastercard.svg";
import alipay from "payment-icons/min/single/alipay.svg";
import amex from "payment-icons/min/single/amex.svg";
import maestro from "payment-icons/min/single/maestro.svg";
import paypal from "payment-icons/min/single/paypal.svg";
import visa from "payment-icons/min/single/visa.svg";
import dai from "../assets/multi-collateral-dai-dai-logo.png";

type PaymentMethodType = "mastercard" | "alipay" | "amex" | "maestro" | "paypal" | "visa" | "dai";

interface PaymentIconProps {
  type: PaymentMethodType;
}

export const PaymentIcon = ({ type, ...rest }: PaymentIconProps) => {
  let paymentIcon;
  switch (type) {
    case "mastercard":
      paymentIcon = mastercard;
      break;
    case "alipay":
      paymentIcon = alipay;
      break;
    case "amex":
      paymentIcon = amex;
      break;
    case "maestro":
      paymentIcon = maestro;
      break;
    case "paypal":
      paymentIcon = paypal;
      break;
    case "visa":
      paymentIcon = visa;
      break;
    case "dai":
      paymentIcon = dai;
      break;
    default:
      throw new Error("Unknown payment method");
  }
  return (
    <div {...rest} className="payment-icon">
      <img src={paymentIcon} width={40} />
    </div>
  );
};

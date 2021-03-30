export const getCurrencySymbol = (currency: string) => {
  if (currency == "USD") {
    return "$";
  } else if (currency == "EUR") {
    return "€";
  } else if (currency == "INR") {
    return "₹";
  } else if (currency == "DAI") {
    return "◈";
  } else {
    throw new Error("Invalid/Unsupported currency");
  }
};

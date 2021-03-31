export enum TransactionType {
  Donation,
  Redistribution,
}

export default interface Transaction {
  id: string;
  tid: string;
  uid: undefined | string;
  isRegistered: boolean;
  type: TransactionType;
  beneficiary: string;
  remitter: string;
  emittedAt: number;
  recordedAt: number;
  amount: number;
  currency: string;
  analytics: Analytics;
}

interface Analytics {
  isFirstOfType: boolean;
  beneficiaryCount: number;
  remitterCount: number;
  didMeetDemonstratedNeed: undefined | boolean;
  percentageIncreaseFromLastTransaction: number;
}

// type TransactionType = "Donated" | "Received";

// type SupportedCurrencyType = "USD" | "EUR" | "GBP" | "INR" | "DAI";

// interface ReceivedTransactionType {
//   readonly type: TransactionType;
//   readonly isFirstOfKind?: boolean;
//   readonly donorCount?: number;
//   readonly didMeetDemonstratedNeed?: boolean;
// }

// interface SentTransactionType {
//   readonly type: TransactionType;
//   readonly isFirstOfKind?: boolean;
//   readonly redistributionCount?: number;
//   readonly donationMatchCount?: number;
// }

// type TransactionSummaryType = ReceivedTransactionType | SentTransactionType;

// export default interface Transaction {
//   readonly type: TransactionType;
//   readonly timestamp: number;
//   readonly uuid: string;
//   readonly amount: number;
//   readonly currency: SupportedCurrencyType;
//   readonly summary: TransactionSummaryType;
// }

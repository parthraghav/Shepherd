export enum TransactionType {
  Donation,
  Redistribution,
}

export interface Transaction {
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

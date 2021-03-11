export interface User {
  id: string;
  uid: string;
  walletAddress: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  didSetupPaymentMethod: boolean;
  demonstratedNeedAmount: number;
  demonstratedNeedAmountUpdatedAt: number;
  weeklyDonationAmount: number;
}

import * as admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { Transaction, TransactionType } from "../interfaces/interfaces";

export const doRecordTransaction = async () => {
  const firestore = admin.firestore();
  const transactionId = uuidv4();
  const transactionRef = firestore.collection("transactions").doc(transactionId);

  await transactionRef.set(
    {
      id: transactionId,
      tid: transactionId,
      uid: "test-user",
      isRegistered: false,
      type: TransactionType.Donation,
      beneficiary: "0x0",
      remitter: "0x0",
      emittedAt: 1615481380627,
      recordedAt: 1615481380627,
      amount: 100,
      currency: "DAU",
      analytics: {
        isFirstOfType: true,
        beneficiaryCount: 15,
        remitterCount: 10,
        didMeetDemonstratedNeed: true,
        percentageIncreaseFromLastTransaction: 0,
      },
    } as Transaction,
    { merge: true },
  );
};

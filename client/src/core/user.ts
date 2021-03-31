import { FirebaseApp } from "../firebase";
import app from "firebase/app";
import { enroll } from "./redistributor";

export const getMyInfo = async () => {
  const uid = FirebaseApp.auth.currentUser?.uid;
  if (!uid) return;
  const userRef = FirebaseApp.db.collection("users").doc(uid);
  const userDoc = await userRef.get();
  if (userDoc.exists) {
    const data = userDoc.data();
    return data;
  } else {
    return;
  }
};

export const updateMyName = async (newName: string) => {
  const uid = FirebaseApp.auth.currentUser?.uid;
  if (!uid) return;
  const userRef = FirebaseApp.db.collection("users").doc(uid);
  await userRef.update({
    name: newName,
  });
};

export const updateMyWeeklyDonationAmount = async (newAmount: number) => {
  const uid = FirebaseApp.auth.currentUser?.uid;
  if (!uid) return;
  const userRef = FirebaseApp.db.collection("users").doc(uid);
  await userRef.update({
    weeklyDonationAmount: newAmount,
  });
};

export const updateMyDemonstratedNeedAmount = async (newAmount: number) => {
  const uid = FirebaseApp.auth.currentUser?.uid;
  if (!uid) return;
  const userRef = FirebaseApp.db.collection("users").doc(uid);
  await userRef.update({
    demonstratedNeedAmount: newAmount,
    demonstratedNeedAmountUpdatedAt: app.firestore.FieldValue.serverTimestamp(),
  });
};

export const updateMyWalletAddress = async (newWalletAddress: string) => {
  const uid = FirebaseApp.auth.currentUser?.uid;
  if (!uid) return;
  const userRef = FirebaseApp.db.collection("users").doc(uid);
  await userRef.update({
    walletAddress: newWalletAddress,
  });
};

export const markMeEnrolled = async () => {
  const uid = FirebaseApp.auth.currentUser?.uid;
  if (!uid) return;
  const userRef = FirebaseApp.db.collection("users").doc(uid);
  await userRef.update({
    isEnrolled: true,
  });
};

export const enrollMe = async () => {
  const myInfo = await getMyInfo();
  if (!myInfo) {
    console.error("Enrollment failed because the user is not logged in.");
    return;
  }
  if (myInfo.isEnrolled) {
    console.error("Enrollment failed because the user is already marked as enrolled.");
    return;
  }
  if (["0x0", undefined, ""].includes(myInfo.walletAddress)) {
    console.error("Enrollment aborted because the wallet address is bad.");
    return;
  }
  const result = await enroll(myInfo.walletAddress, myInfo.name);
  if (result) markMeEnrolled();
  else console.error("Enrollment failed due to an error");
};

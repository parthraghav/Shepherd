import { FirebaseApp } from "../firebase";
import app from "firebase/app";

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

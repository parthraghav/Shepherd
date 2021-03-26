import Transaction from "@models/transaction";
import app from "firebase/app";
import { FirebaseApp } from "../firebase";

export const getMyTransactions = async () => {
  const uid = FirebaseApp.auth.currentUser?.uid;
  if (!uid) return;
  const transactionsRef = FirebaseApp.db
    .collection("transactions")
    .where("uid", "in", [uid])
    .orderBy("recordedAt", "desc");
  const transactionsSnapshot = await transactionsRef.get();
  let fetchedTransactions: any = [];

  if (!transactionsSnapshot.empty) {
    transactionsSnapshot.forEach(doc => {
      const transaction = doc.data();
      fetchedTransactions.push(transaction);
    });
  }

  return fetchedTransactions;
};

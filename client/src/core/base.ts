import { FirebaseApp } from "../firebase";

export const getBaseInfo = async () => {
  const uid = FirebaseApp.auth.currentUser?.uid;
  if (!uid) return;
  const baseRef = FirebaseApp.db.collection("base").doc("1.0.0");
  const baseDoc = await baseRef.get();
  if (baseDoc.exists) {
    const data = baseDoc.data();
    return data;
  } else {
    return;
  }
};

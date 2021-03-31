import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onCreate = async (user: admin.auth.UserRecord) => {
  try {
    // create firebase user reference
    const userRef = admin.firestore().collection("users").doc(user.uid);
    const timestamp = admin.firestore.Timestamp.now().toMillis();
    await userRef.set({
      id: user.uid,
      uid: user.uid,
      walletAddress: "0x0",
      isWalletAddressProvided: false,
      createdAt: timestamp,
      updatedAt: timestamp,
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      isDisabled: user.disabled,
      isUserEnrolled: false,
      phoneNumber: user.phoneNumber,
      didSetupPaymentMethod: false,
      demonstratedNeedAmount: 0,
      demonstratedNeedAmountUpdatedAt: timestamp,
      weeklyDonationAmount: 5,
    });
    return true;
  } catch (e) {
    functions.logger.error(e);
    return false;
  }
};

import { FirebaseApp } from "../firebase";

export const loginWithGoogle = () => {
  FirebaseApp.auth.signInWithRedirect(FirebaseApp.GoogleAuthProvider);
};

export const logout = async () => {
  await FirebaseApp.auth.signOut();
};

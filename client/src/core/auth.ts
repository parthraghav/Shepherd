import { FirebaseApp } from "../firebase";

export const loginWithGoogle = () => {
  FirebaseApp.auth.signInWithRedirect(FirebaseApp.GoogleAuthProvider);
};

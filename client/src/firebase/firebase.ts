import app from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore"; // <- needed if using firestore
import "firebase/functions"; // <- needed if using functions
import { FIREBASE_CONFIG } from "./config";

class Firebase {
  db: app.firestore.Firestore;
  analytics: app.analytics.Analytics;
  functions: app.functions.Functions;
  auth: app.auth.Auth;
  constructor() {
    app.initializeApp(FIREBASE_CONFIG);
    this.db = app.firestore(); // <- needed if using firestore
    this.analytics = app.analytics();
    this.functions = app.functions();
    this.auth = app.auth();
  }
}

const FirebaseApp = new Firebase();

export { FirebaseApp, Firebase };

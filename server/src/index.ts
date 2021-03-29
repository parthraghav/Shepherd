import * as CloudFunctions from "firebase-functions";
import * as admin from "firebase-admin";
import * as Mirror from "./Mirror";
import * as Triggers from "./Triggers";
const functions = CloudFunctions.region("us-central1");
admin.initializeApp();

////////////////////////////////// TRIGGERS //////////////////////////////////
export const authOnCreate = functions.auth.user().onCreate(Triggers.Auth.onCreate);

////////////////////////////////// REQUESTS //////////////////////////////////
export const didContractEmitTransaction = functions.https.onRequest(Mirror.didContractEmitTransaction);

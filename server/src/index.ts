import * as CloudFunctions from "firebase-functions";
import * as admin from "firebase-admin";
import * as Mirror from "./Mirror";
const functions = CloudFunctions.region("us-central1");

admin.initializeApp();

////////////////////////////////// REQUESTS //////////////////////////////////
export const didContractEmitTransaction = functions.https.onRequest(Mirror.didContractEmitTransaction);

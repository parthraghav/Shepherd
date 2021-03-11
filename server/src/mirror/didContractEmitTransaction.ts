import * as functions from "firebase-functions";
import { doRecordTransaction } from "./doRecordTransaction";

export const didContractEmitTransaction = async (req: any, res: any) => {
  let result = "";
  try {
    await doRecordTransaction();
    result = "success";
  } catch (e) {
    functions.logger.error(e);
    result = "failure";
  } finally {
    res.send(result);
  }
};

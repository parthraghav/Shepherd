import { Signer } from "@ethersproject/abstract-signer";

export interface Accounts {
  admin: string;
  user: string;
}

export interface Signers {
  admin: Signer;
  user: Signer;
}

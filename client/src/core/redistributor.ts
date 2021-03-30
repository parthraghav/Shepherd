import { Redistributor } from "../abis";
import { web3 } from "./web3";

const redistributorContractAddress = "0xCdc97a6BaA2dFFD937E3cb22a947507eF6E1c7E6"; // Replace DAI Address Here (can be the actual smart contract)

export const donate = async (amount: number) => {
  try {
    const redistributor = new web3.eth.Contract(Redistributor.abi, redistributorContractAddress);
    await redistributor.methods.donate(amount).call();
    return true;
  } catch (e) {
    return false;
  }
};

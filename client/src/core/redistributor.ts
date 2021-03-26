import { Redistributor } from "../abis";
import { web3 } from "./web3";

const redistributorContractAddress = "0x24931f7dCF166b2DF705a2dc948aD34c418390aC"; // Replace DAI Address Here (can be the actual smart contract)

export const donate = async (walletAddress: string, amount: string) => {
  try {
    const redistributor = new web3.eth.Contract(Redistributor.abi, redistributorContractAddress);
    await redistributor.methods.donate(amount).send({ from: walletAddress });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const enroll = async (walletAddress: string, userName: string) => {
  try {
    const redistributor = new web3.eth.Contract(Redistributor.abi, redistributorContractAddress);
    await redistributor.methods.enroll(walletAddress, userName).send({ from: walletAddress });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

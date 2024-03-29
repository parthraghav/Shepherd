import { DaiToken } from "../abis";
import { web3 } from "./web3";

const daiTokenAddress = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"; // Replace DAI Address Here (can be the actual smart contract)

export const getDaiBalance = async (walletAddress: string) => {
  const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenAddress);
  const balance = await daiToken.methods.balanceOf(walletAddress).call();
  return balance;
};

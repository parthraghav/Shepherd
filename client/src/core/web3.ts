import Web3 from "web3";

const LOCAL_PROVIDER = "http://localhost:3000";
const REMOTE_PROVIDER = "https://kovan.infura.io/v3/79da42feadf04d3a96267c3724f5840d";

export const web3 = new Web3(Web3.givenProvider || REMOTE_PROVIDER);

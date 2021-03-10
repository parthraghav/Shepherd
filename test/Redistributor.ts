import { Signer } from "@ethersproject/abstract-signer";
import { ethers, waffle } from "hardhat";

import RedistributorArtifact from "../artifacts/contracts/Redistributor.sol/Redistributor.json";

import { Accounts, Signers } from "../types";
import { Redistributor } from "../typechain/Redistributor";
import { shouldBehaveLikeRedistributor } from "./Redistributor.behavior";

const { deployContract } = waffle;

describe("Redistributor Unit tests", function () {
  before(async function () {
    this.accounts = {} as Accounts;
    this.signers = {} as Signers;

    const signers: Signer[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.user = signers[1];
    this.accounts.admin = await signers[0].getAddress();
    this.accounts.user = await signers[1].getAddress();
    this.currentAccounts = signers;
  });

  describe("Redistributor", function () {
    beforeEach(async function () {
      const adminName: string = "Parth Raghav";
      this.redistributor = (await deployContract(this.signers.admin, RedistributorArtifact, [
        adminName,
      ])) as Redistributor;
    });

    shouldBehaveLikeRedistributor();
  });
});

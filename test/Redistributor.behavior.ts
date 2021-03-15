import { expect } from "chai";
import { assert } from "console";
import web3 from "web3";

require("chai").use(require("chai-as-promised")).should();

function tokens(n: string) {
  return web3.utils.toWei(n, "ether");
}

function dollars(n: string) {
  return web3.utils.fromWei(n);
}

export function shouldBehaveLikeRedistributor(): void {
  it("should have correct version number", async function () {
    const version = await this.redistributor.connect(this.signers.admin).version();
    expect(version).to.equal("0.0.0");
  });

  it("should have correct admin details", async function () {
    const redistributor = this.redistributor.connect(this.signers.admin);
    const adminDetailsFromContract = await redistributor.admin();

    expect(adminDetailsFromContract[0]).to.equal(this.accounts.admin, "Admin address is correct");
    expect(adminDetailsFromContract[1]).to.equal("Parth Raghav", "Admin name is correct");
    expect(parseInt(adminDetailsFromContract[2].toString())).to.be.lessThan(
      new Date().getTime(),
      "Admin creation date is not in future",
    );

    const isAdminEnrolled = await redistributor.isUserEnrolled(this.accounts.admin);
    expect(isAdminEnrolled).to.equal(true, "Admin is enrolled");

    // const usersList = await redistributor.users();
  });

  it("should allow admin to yield to someone else", async function () {
    const redistributor = this.redistributor.connect(this.signers.admin);

    // find first admin
    const firstAdmin = await redistributor.admin();
    expect(firstAdmin[1]).to.equal("Parth Raghav", "First Admin name is correct");

    // yield power
    const secondAdminAddr = await this.currentAccounts[1].getAddress();
    await redistributor.yield(secondAdminAddr, "John Doe");

    // find next admin
    const secondAdmin = await redistributor.admin();
    expect(secondAdmin[1]).to.equal("John Doe", "Second Admin name is correct");

    // yield power again with the first account (should fail)
    redistributor.yield(secondAdminAddr, "John Doe").should.eventually.be.rejected;
  });

  it("should allow only the admin kill the contract", async function () {
    this.redistributor.connect(this.signers.user).kill().should.eventually.be.rejected;
    this.redistributor.connect(this.signers.admin).kill().should.eventually.be.fulfilled;
  });

  it("should receive donations", async function () {
    const redistributor = this.redistributor.connect(this.signers.admin);
    const daiToken = this.daiToken.connect(this.signers.admin);

    const sumBefore = dollars((await redistributor.sum()).toString());
    expect(sumBefore).to.equal("0", "Sum before receiving the donation should be zero");

    // Transfer dai tokens into the users account
    await daiToken.transfer(this.currentAccounts[0].getAddress(), tokens("100"), {
      from: await this.currentAccounts[0].getAddress(),
    });

    // Approve the donation
    await daiToken.approve(redistributor.address, tokens("100"), {
      from: await this.currentAccounts[0].getAddress(),
    });

    // Call the donation method on the contract
    const donation = await redistributor.donate(tokens("100"), {
      from: await this.currentAccounts[0].getAddress(),
    });

    const sumAfter = dollars((await redistributor.sum()).toString());
    expect(sumAfter).to.equal("100", "Sum after receiving the first donation should equal the donation amount");

    // Check if the Donation Transaction Event is Emitted
    const receipt = await donation.wait();
    const loggedEvents = receipt.events?.filter((x: any) => {
      return x.event == "Transaction";
    });
    expect(loggedEvents.length).to.equal(
      1,
      "Only a single donation transaction should be emitted on calling donate method",
    );
    expect(loggedEvents[0].args.transactionType).to.equal(
      0,
      "Calling donate method should emit a transaction of type Donation",
    );
  });

  it("should redistribute all the collected money", async function () {
    const redistributorContract = this.redistributor;
    const daiTokenContract = this.daiToken;

    let redistributor, donation, daiToken;
    const user1 = this.currentAccounts[1];
    const user2 = this.currentAccounts[2];
    const sum1 = "10";
    const sum2 = "80";

    daiToken = daiTokenContract.connect(this.signers.admin);
    // Transfer dai tokens into the users account
    await daiToken.transfer(user1.address, tokens(sum1));
    await daiToken.transfer(user2.address, tokens(sum2));

    // USER 1
    daiToken = daiTokenContract.connect(user1);
    // Approve the donation
    await daiToken.approve(redistributorContract.address, tokens(sum1));
    // connect to the Redistributor contract
    redistributor = redistributorContract.connect(user1);
    // Enroll in the redistribution program
    await redistributor.enroll(user1.address, "User1");
    // User 1 donates
    donation = await redistributor.donate(tokens(sum1));

    // USER 2
    daiToken = daiTokenContract.connect(user2);
    // Approve the donation
    await daiToken.approve(redistributorContract.address, tokens(sum2));
    // connect to the Redistributor contract
    redistributor = redistributorContract.connect(user2);
    // Enroll in the redistribution program
    await redistributor.enroll(user2.address, "User2");
    // User 2 donates
    donation = await redistributor.donate(tokens(sum2));

    const sumBefore = dollars((await redistributor.sum()).toString());
    expect(sumBefore).to.equal(
      (parseInt(sum1) + parseInt(sum2)).toString(),
      "Total sum collected should equal the mathematical sum of first donation and the second",
    );
    redistributor = redistributorContract.connect(this.signers.admin);
    await redistributor.redistribute();

    const sumAfter = dollars((await redistributor.sum()).toString());
    expect(sumAfter).to.equal("0", "Before the redistribution rewards are remitted, the sum should be set to 0");
    const user1BalanceAfterRewardRemittence = dollars((await daiToken.balanceOf(user1.address)).toString());
    const user2BalanceAfterRewardRemittence = dollars((await daiToken.balanceOf(user2.address)).toString());

    expect(user1BalanceAfterRewardRemittence).to.equal(
      "30",
      "2 users and the contract owner combined, the collected sum should be divided into 3 parts.",
    );
    expect(user2BalanceAfterRewardRemittence).to.equal(
      "30",
      "2 users and the contract owner combined, the collected sum should be divided into 3 parts.",
    );
  });
}

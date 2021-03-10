import { expect } from "chai";

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
    console.log(firstAdmin[1]);

    // yield power
    const secondAdminAddr = await this.currentAccounts[1].getAddress();
    console.log(secondAdminAddr);
    await redistributor.yield(secondAdminAddr, "John Doe");

    // find next admin
    const secondAdmin = await redistributor.admin();
    expect(secondAdmin[1]).to.equal("John Doe", "Second Admin name is correct");
    console.log(secondAdmin[1]);

    // yield power again with the first account (should fail)
    // expect(async () => await redistributor.yield(secondAdminAddr, "John Doe")).to.throw(
    //   "VM Exception while processing transaction: revert Not admin: You're not authorized",
    // );
  });
}

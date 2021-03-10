import { expect } from "chai";

require("chai").use(require("chai-as-promised")).should();

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
    this.redistributor.connect(this.signers.admin).kill().should.eventually.be.fulfilled;
    this.redistributor.connect(this.signers.user).kill().should.eventually.be.rejected;
  });
}

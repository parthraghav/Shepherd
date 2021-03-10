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
}

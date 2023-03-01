const ERC20Contract = artifacts.require("ERC20");
let piaContract = null;

contract("PIA Coin", async (account) => {
  it("PIA Coin has correct name", async () => {
    piaContract = await ERC20Contract.deployed();
    let actualName = await piaContract.name();
    assert.equal(
      actualName,
      "PIA Coin",
      "PIA Coin has another name = PIA Coin"
    );
    assert(actualName === "PIA Coin", "PIA Coin has another name = PIA Coin");
  });
  it("PIA Coin has correct symbol", async () => {
    let actualSymbol = await piaContract.symbol();
    assert.equal(actualSymbol, "PIA", "PIA Coin has another symbol = PIA");
    assert(actualSymbol === "PIA", "PIA Coin has another symbol PIA");
  });
  it("PIA Coin has correct decimals", async () => {
    let actualDecimals = await piaContract.decimals();
    actualDecimals = actualDecimals.toString();
    assert.equal(actualDecimals, 18, "PIA Coin has another decimals = 18");
    assert(actualDecimals == 18, "PIA Coin has another decimals 18");
  });
  it("PIA Coin has correct totalSupply", async () => {
    let actualTotalSupply = await piaContract.totalSupply();
    actualTotalSupply = actualTotalSupply.toString();

    assert.equal(
      actualTotalSupply,
      2900000000000000000000000,
      "PIA Coin has another totalSupply = 2900000000000000000000000"
    );
    assert(
      actualTotalSupply == 2900000000000000000000000,
      "PIA Coin has another totalSupply 2900000000000000000000000"
    );
  });
  it("PIA Coin has correct totalSupply", async () => {
    let actualAccountBalance = await piaContract.balanceOf(
      piaContract.constructor.class_defaults.from
    );
    actualAccountBalance = actualAccountBalance.toString();

    assert.equal(
      actualAccountBalance,
      2900000000000000000000000,
      "Account Balance has another totalSupply = 2900000000000000000000000"
    );
    assert(
      actualAccountBalance == 2900000000000000000000000,
      "Account Balance has another totalSupply = 2900000000000000000000000"
    );
  });
});

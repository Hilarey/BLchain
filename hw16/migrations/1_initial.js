const ERC20Contract = artifacts.require("ERC20");

module.exports = async (deployer) => {
  await deployer.deploy(ERC20Contract);
  await ERC20Contract.deployed();
};

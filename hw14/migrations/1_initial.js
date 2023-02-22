const StringCompareContract = artifacts.require("StringComparer");
const FarmerContract = artifacts.require("Farmer");
const CowContract = artifacts.require("Cow");
const HorseContract = artifacts.require("Horse");
const WolfContract = artifacts.require("Wolf");

let farmer = null;

module.exports = async (deployer) => {
  // деплой контракта в блокчейн мережу
  await deployer.deploy(StringCompareContract);
  // вивести копію, яку щойно завантажили
  await StringCompareContract.deployed();

  await deployer.link(StringCompareContract, [
    CowContract,
    FarmerContract,
    HorseContract,
    WolfContract,
  ]);

  await deployer.deploy(CowContract, CowContract.name);
  await deployer.deploy(FarmerContract);
  await deployer.deploy(HorseContract, HorseContract.name);
  await deployer.deploy(WolfContract, WolfContract.name);

  let cow = await CowContract.deployed();
  let horse = await HorseContract.deployed();
  farmer = await FarmerContract.deployed();
  let wolf = await WolfContract.deployed();

  let cowCall = await call(cow.address);
  let horseCall = await call(horse.address);
  console.log(cowCall);
  console.log(horseCall);

  let wolfFeedMeat = await feed(wolf.address, "meat");
  console.log("Вовк із задоволенням з`їсть meat", wolfFeedMeat);

  try {
    let wolfFeedPlant = await feed(wolf.address, "plant");
    console.log(wolfFeedPlant);
  } catch (e) {
    if (e.message.indexOf("revert") >= 0) {
      console.log("Вовк не з`їсть plant");
    }
  }
};

async function call(address) {
  return await farmer.call(address);
}

async function feed(address, food) {
  return await farmer.feed(address, food);
}

// let wolfFeedPlant = await feed(wolf.address, "plant");
// let wolfFeedMeat = await feed(wolf.address, "meat");

// console.log("wolfFeedPlant", wolfFeedPlant);
// console.log("wolfFeedMeat", wolfFeedMeat);

// так ми беремо адрессу з ганешу.
// cowAddress = (await web3.eth.getAccounts())[1];
// horseAddress = (await web3.eth.getAccounts())[2];
// farmerAddress = (await web3.eth.getAccounts())[3];

// cow.address = (await web3.eth.getAccounts())[1];
// console.log("ЦЕ КОНТРАКТ КОРОВИ:>> ", cow.address);

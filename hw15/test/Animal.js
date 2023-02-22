const StringCompareContract = artifacts.require("StringComparer");
const FarmerContract = artifacts.require("Farmer");
const HorseContract = artifacts.require("Horse");
const DogContract = artifacts.require("Dog");

let horse = null;
let farmer = null;
let dog = null;

contract("Horse and Farmer", async (account) => {
  it("Horse has the correct name.", async () => {
    // await StringCompareContract.deployed();
    horse = await HorseContract.deployed();
    farmer = await FarmerContract.deployed();
    let actualName = await horse.getName();
    assert.equal(actualName, "Tail", "Horse can not sleep");
  });
  it("Horse can sleep.", async () => {
    assert.equal(await horse.sleep(), "Z-z-z...", "Horse can not sleep");
  });
  it("Horse can eat “plant”.", async () => {
    assert.equal(
      await horse.eat("plant"),
      "Animal eats plant",
      "Horse can eat only plant"
    );
  });
  it("Horse cannot eat ”meat”, ”not-food”, ”plastic”.", async () => {
    let horseEatMeat = false;
    let horseEatNotFood = false;
    let horseEatPlastic = false;
    let errorMessageEat = "";

    try {
      horseEatMeat = await horse.eat("meat");
      horseEatPlastic = await horse.eat("plastic");
      horseEatNotFood = await horse.eat("not-food");
    } catch (e) {
      errorMessageEat = e.message;
    }
    assert.isTrue(
      errorMessageEat.indexOf("revert") >= 0,
      "Expected Error Message"
    );
    assert.equal(
      horseEatMeat && horseEatNotFood && horseEatPlastic,
      false,
      "Horse can not eat not plant food"
    );
  });
  it("Farmer can call Horse", async () => {
    let horseCall = await farmer.call(horse.address);
    assert.equal(horseCall, "Igogo", "Horse can call only Igogo");
  });
  it("Farmer can feed Horse with plant", async () => {
    let horseFeed = await farmer.feed(horse.address, "plant");
    assert.equal(horseFeed, "Animal eats plant", "Horse can eat only plant");
  });

  it("Farmer cannot feed Horse with anything else(”meat”,”plastic”,”fingers”,etc)", async () => {
    let horseFeedByMeat = false;
    let horseFeedByFingers = false;
    let horseFeedByPlastic = false;
    let errorMessageFeed = "";

    try {
      horseFeedByMeat = await farmer.feed(horse.address, "meat");
      horseFeedByFingers = await farmer.feed(horse.address, "fingers");
      horseFeedByPlastic = await farmer.feed(horse.address, "plastic");
    } catch (e) {
      errorMessageFeed = e.message;
    }
    assert.isTrue(
      errorMessageFeed.indexOf("revert") >= 0,
      "Expected Error Message"
    );
    assert.equal(
      horseFeedByMeat && horseFeedByFingers && horseFeedByPlastic,
      false,
      "You can not feed horse by not plant food"
    );
  });
});

contract("Dog and Farmer", async (account) => {
  it("Dog has the correct name.", async () => {
    dog = await DogContract.deployed();
    farmer = await FarmerContract.deployed();
    let actualName = await dog.getName();
    assert.equal(actualName, "Lewa", "Dog can not sleep");
  });
  it("Dog can sleep.", async () => {
    assert.equal(await dog.sleep(), "Z-z-z...", "Dog can not sleep");
  });
  it("Dog can eat “plant”.", async () => {
    assert.equal(
      await dog.eat("plant"),
      "Animal eats plant",
      "Dog can eat only plant or meat"
    );
  });
  it("Dog can eat “meat”.", async () => {
    assert.equal(
      await dog.eat("meat"),
      "Animal eats meat",
      "Dog can eat only plant or meat"
    );
  });
  it("Dog cannot eat ”not-food”, ”plastic”, ”chocolate”.", async () => {
    let DogEatChocolate = false;
    let DogEatNotFood = false;
    let DogEatPlastic = false;
    let errorMessageEat = "";

    try {
      DogEatChocolate = await dog.eat("chocolate");
      DogEatNotFood = await dog.eat("not-food");
      DogEatPlastic = await dog.eat("plastic");
    } catch (e) {
      errorMessageEat = e.message;
    }
    assert.isTrue(
      errorMessageEat.indexOf("revert") >= 0,
      "Expected Error Message"
    );
    assert.equal(
      DogEatChocolate && DogEatNotFood && DogEatPlastic,
      false,
      "Dog can not eat not plant food or meat food"
    );
  });
  it("Farmer can call Dog", async () => {
    let dogCall = await farmer.call(dog.address);
    assert.equal(dogCall, "Woof", "Dog can call only Woof");
  });
  it("Farmer can feed Dog with ”meat”,”plant”", async () => {
    let dogFeedByMeat = await farmer.feed(dog.address, "meat");
    let dogFeedByPlant = await farmer.feed(dog.address, "plant");
    assert.equal(
      dogFeedByMeat,
      "Animal eats meat",
      "Dog can eat only plant or meat food"
    );
    assert.equal(
      dogFeedByPlant,
      "Animal eats plant",
      "Dog can eat only plant or meat food"
    );
  });

  it("Farmer cannot feed Dog with ”not-food”, ”plastic” and anything else", async () => {
    let dogFeedByNotFood = false;
    let dogFeedByPlastic = false;
    let dogFeedByIron = false;
    let errorMessageFeed = "";

    try {
      dogFeedByNotFood = await farmer.feed(dog.address, "not-food");
      dogFeedByPlastic = await farmer.feed(dog.address, "plastic");
      dogFeedByIron = await farmer.feed(dog.address, "iron");
    } catch (e) {
      errorMessageFeed = e.message;
    }
    assert.isTrue(
      errorMessageFeed.indexOf("revert") >= 0,
      "Expected Error Message"
    );
    assert.equal(
      dogFeedByNotFood && dogFeedByPlastic && dogFeedByIron,
      false,
      "You can not feed dog by not plant or meat food"
    );
  });
});

//_______________________)

// module.exports = async () => {
//   // деплой контракта в блокчейн мережу
//   await deployer.deploy(StringCompareContract);
//   // вивести копію, яку щойно завантажили
//   await StringCompareContract.deployed();

//   await deployer.link(StringCompareContract, [
//     CowContract,
//     FarmerContract,
//     HorseContract,
//     WolfContract,
//   ]);

//   await deployer.deploy(CowContract, CowContract.name);
//   await deployer.deploy(FarmerContract);
//   await deployer.deploy(HorseContract, HorseContract.name);
//   await deployer.deploy(WolfContract, WolfContract.name);

//   let cow = await CowContract.deployed();
//   let horse = await HorseContract.deployed();
//   farmer = await FarmerContract.deployed();
//   let wolf = await WolfContract.deployed();

//   let cowCall = await call(cow.address);
//   let horseCall = await call(horse.address);
//   console.log(cowCall);
//   console.log(horseCall);

//   let wolfFeedMeat = await feed(wolf.address, "meat");
//   console.log("Вовк із задоволенням з`їсть meat", wolfFeedMeat);

//   try {
//     let wolfFeedPlant = await feed(wolf.address, "plant");
//     console.log(wolfFeedPlant);
//   } catch (e) {
//     if (e.message.indexOf("revert") >= 0) {
//       console.log("Вовк не з`їсть plant");
//     }
//   }
// };

// async function call(address) {
//   return await farmer.call(address);
// }

// async function feed(address, food) {
//   return await farmer.feed(address, food);
// }

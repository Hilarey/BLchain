const Web3 = require("web3");
const Abi = require("./abi/abi");
const web3 = new Web3("http://127.0.0.1:7545");

// contractAddress -  это задеплоенный адресс в ремиксе
let contractAddress = "0xAD450a8BF291656DF8009Aa528810e1384a57057";
let contract = new web3.eth.Contract(Abi, contractAddress);

// console.log("contract :>> ", contract);

async function getContact(index) {
  return await contract.methods.getContact(index).call();
}

async function addContact(name) {
  return await contract.methods.addContact(name).send({
    from: "0x4A92E04dFf648FB083819D12D1f85E892c36858F",
    gas: "3000000",
  });
}

async function callContact(index) {
  return await contract.methods.callContact(index).call();
}

async function ContactBook() {
  let contact_0 = await getContact(0);
  console.log("contact_0 :>> ", contact_0);
  let newContact = await addContact("Yarik");
  console.log("newContact :>> ", newContact);
  let contact_01 = await getContact(1);
  console.log("contact_01 :>> ", contact_01);
  let callNewContact = await callContact(1);
  console.log("callNewContact :>> ", callNewContact);
}

ContactBook();

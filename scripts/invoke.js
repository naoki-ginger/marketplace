const { ethers } = require("hardhat");
const hre = require("hardhat");

const marketAddress = "0xd0e67eb970ca374c806A8D227FBAF3587300b8B7";
const nftToken = "0x65c1f49cf008FB4E5062049dF1122AFa2C3A435c";
const erc20Token = "0xC617A7BA53f7C76E1b3269f2e7ecfD1624cfde71";

async function main() {

  // await testName();
  // await testCreateOrder();
  // await testCancelOrder();
  // await testFulfilOrder();
  // await testGetOrdersByOwner();
}

async function testName() {
  // We get the deployed contract
  const contract = await hre.ethers.getContractAt("MyMarket", marketAddress);
  // const [signer1, signer2] = await hre.ethers.getSigners();


  console.log(await contract.name());
  console.log(await contract.owner());
}

async function testCreateOrder() {

  const contract = await hre.ethers.getContractAt("MyMarket", marketAddress);

  const [owner] = await ethers.getSigners();

  // approve contract
  const nftContract = await hre.ethers.getContractAt("contracts/IERC721.sol:IERC721", nftToken);
  var tx = await nftContract.setApprovalForAll(marketAddress, true);
  console.log(tx.hash);
  var receipt = await tx.wait();
  console.log(receipt.status);

  const erc20Contract = await hre.ethers.getContractAt("contracts/IERC20.sol:IERC20", erc20Token);
  var tx = await erc20Contract.approve(marketAddress, 1000000000);
  console.log(tx.hash);
  var receipt = await tx.wait();
  console.log(receipt.status);

  var tx = await contract.createOrder(1, nftToken, 3, erc20Token, 100, 1, 1);
  console.log(tx.hash);
  var receipt = await tx.wait();
  console.log(receipt.status);
  console.log('order: ', (await contract.getOrdersByOwner(owner.getAddress())));
}

async function testCancelOrder() {
  const contract = await hre.ethers.getContractAt("MyMarket", marketAddress);

  const [owner] = await ethers.getSigners();

  var tx = await contract.cancelOrder(2);
  console.log(tx.hash);

  var receipt = await tx.wait();
  console.log(receipt.status);
  console.log('order: ', (await contract.getOrdersByOwner(owner.getAddress())));
}

async function testFulfilOrder() {

  const [owner, user] = await ethers.getSigners();

  const contract = await hre.ethers.getContractAt("MyMarket", marketAddress);

  const erc20Contract = await hre.ethers.getContractAt("contracts/IERC20.sol:IERC20", erc20Token);
  var tx = await erc20Contract.connect(user).approve(marketAddress, 100000);
  console.log(tx.hash);
  var receipt = await tx.wait();
  console.log(receipt.status);

  var tx = await contract.connect(user).fulfillOrder(5, 100);
  console.log(tx.hash);

  var receipt = await tx.wait();
  console.log(receipt.status);
}

async function testGetOrdersByOwner() {
  const [owner] = await ethers.getSigners();

  const contract = await hre.ethers.getContractAt("MyMarket", marketAddress);
  console.log('order: ', (await contract.getOrdersByOwner(owner.getAddress())));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
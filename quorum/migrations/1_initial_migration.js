const Migrations = artifacts.require("Migrations");
const Web3 = require("web3");
const web3 = new Web3(process.env.PROVIDER);
const NODE_ADDRESS = process.env.ADDRESS;
const NODE_PASSWORD = process.env.PASSWORD;

module.exports = function (deployer) {
  web3.eth.personal.unlockAccount(NODE_ADDRESS, NODE_PASSWORD, 9000).then(async function (res) {
    await deployer.deploy(Migrations);
  });
};

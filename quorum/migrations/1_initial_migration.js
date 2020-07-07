const Migrations = artifacts.require("Migrations");
const Web3 = require("web3");
const web3 = new Web3(process.env.PROVIDER);
const my_address = process.env.ADDRESS;
const my_password = process.env.PASSWORD;

module.exports = function (deployer) {
  web3.eth.personal.unlockAccount(my_address, my_password, 9000).then(async function (res) {
    await deployer.deploy(Migrations);
  });
};

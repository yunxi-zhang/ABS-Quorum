const Web3 = require("web3");
const provider = process.env.PROVIDER;
const dotenv = require("dotenv");
dotenv.config();

module.exports = {

  networks: {
    arg: {
      provider: new Web3.providers.HttpProvider(provider),
      network_id: "*",
      gas: 700000000,
      gasPrice: 0,
      type: "quorum"
    }
  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      },
      version: "0.6.6"
    }
  },
  plugins: ["solidity-coverage"]

}

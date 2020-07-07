const Web3 = require("web3");
const NODE_ENDPOINT = process.env.PROVIDER;

module.exports = {

  networks: {
    bankBuyerSeller: {
      provider: new Web3.providers.HttpProvider(NODE_ENDPOINT),
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

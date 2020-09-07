const config = require("../config/config");
const ADDRESS = config.absConfig.address;
const PASSWORD = config.absConfig.password;
const { getContract, getWeb3 } = require("../web3/web3Setup");
const web3 = getWeb3();

const getBalance = async () => {
    console.log("1");
    try {
        return await web3.eth.personal.unlockAccount(ADDRESS, PASSWORD, 36000).then(async function (res) {
            console.log("res:", res);
            const myContract = await getContract("Buyer");
            let balance = await myContract.methods.retreiveBalance().call();
            return balance;
        });
    } catch (e) {
        console.log(`Error in getBalance function in BuyerContract: ${e}`);
    }
};

module.exports = {
    getBalance
}
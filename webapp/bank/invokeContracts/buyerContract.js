const config = require("../config/config");
const ADDRESS = config.absConfig.address;
const PASSWORD = config.absConfig.password;
const { getContract, getWeb3 } = require("../web3/web3Setup");
const web3 = getWeb3();

const getBalance = async () => {
    try {
        return await web3.eth.personal.unlockAccount(ADDRESS, PASSWORD, 36000).then(async function (res) {
            console.log("1");
            const myContract = await getContract("Buyer");
            console.log("2");
            let balance = await myContract.methods.retreiveBalance().call();
            console.log("3")
        });
    } catch (e) {
        console.log(`Error in getBalance function in BuyerContract: ${e}`);
    }
};

module.exports = {
    getBalance
}
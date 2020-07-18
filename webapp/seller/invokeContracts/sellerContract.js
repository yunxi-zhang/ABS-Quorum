const config = require("../config/config");
const ADDRESS = config.absConfig.address;
const PASSWORD = config.absConfig.password;
const { getContract, getWeb3 } = require("../web3/web3Setup");
const web3 = getWeb3();

const getBalance = async () => {
    try {
        return await web3.eth.personal.unlockAccount(ADDRESS, PASSWORD, 36000).then(async function (res) {
            const myContract = await getContract("Seller");
            let balance = await myContract.methods.retreiveBalance().call();
            return balance;
        });
    } catch (e) {
        console.log(`Error in getBalance function in SellerContract: ${e}`);
    }
};

const updateBalance = async (newBalance) => {
    try {
        return await web3.eth.personal.unlockAccount(ADDRESS, PASSWORD, 36000).then(async function (res) {
            const myContract = await getContract("Seller");
            let contractResponse = await myContract.methods.storeBalance(newBalance).send({
                gas: 700000000,
                gasPrice: 0,
                from: ADDRESS
            });
            console.log("Contract response: ", contractResponse);
            if (contractResponse.status) return contractResponse;
            else throw `Error in updateBalance function in SellerContract: ${contractResponse}`;
        });
    } catch (e) {
        console.log(`Error in updateBalance function in SellerContract: ${e}`);
    }
}

module.exports = {
    getBalance,
    updateBalance
}
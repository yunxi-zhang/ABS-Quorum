const Web3 = require("web3");
const path = require("path");
const fs = require("fs");

//configure options for web3 Websocket
const options = {
    timeout: 120000, // ms

    // Useful if requests result are large
    clientConfig: {
        keepalive: true,
        keepaliveInterval: 60000, // ms
        maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
        maxReceivedMessageSize: 100000000 // bytes - default: 8MiB
    },

    // Enable auto reconnection
    reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: true
    }
};
// Instantiate providers for WSS and HTTPS protocols
const httpsProvider = new Web3.providers.HttpProvider(process.env.PROVIDER, options);

/**
 * Function that gets the inventory contract ABI from the locally stored version or remote blob stored, based on environment
 * @param type: A string defining the contract json to use
 * @returns contract.abi: The abi to use for calling the contract
 */
const getABI = async (type) => {
    let contract;
    try {
        contract = JSON.parse(
            fs.readFileSync(
                path.join(__dirname, `../quorum/build/contracts/${type}.json`),
                "utf8"
            )
        );
        return contract.abi;
    } catch (e) {
        throw `Error in getABI: ${e}`;
    }
};

/**
 * Function that gets the contract address from the locally stored version or remote blob stored, based on environment
 * @param type: A string defining the contract build to retrieve
 * @returns contract.abi: The abi to use for calling the contract
 */
const getContractAddress = async (type) => {
    let contractAddress;
    try {
        contractAddress = fs.readFileSync(
            path.join(__dirname, `../quorum/contractAddresses/${type}DeployedContractAddress.txt`),
            "utf8"
        );
        return contractAddress;
    } catch (e) {
        throw `Error in getABI: ${e}`;
    }
};

/**
 * Function that returns the instantiated web3 websocket or https instance based on the protocol provided
 * If protocol is not passed it will default to https
 * @param protocol: wss or empty
 * @returns web3: the instantiated web3 websocket or https instance
 */
const getWeb3 = (protocol) => {
    switch (protocol) {
        case "wss":
            return new Web3(wssProvider);
        default:
            return new Web3(httpsProvider);
    }
};

/**
 * Function that gets contract object by taking in the compiled contract json name
 * @param type: A string defining the contract json to use
 * @returns myContract: web3 object for connecting the the contract
 */
const getContract = async (type, protocol) => {
    const abi = await getABI(type);
    const contractAddress = await getContractAddress(type);
    const web3 = getWeb3(protocol);
    const myContract = new web3.eth.Contract(abi, contractAddress);
    web3.eth.handleRevert = true; // Allow readable error messages to come from blockchain
    return myContract;
};

module.exports = {
    getContract,
    getWeb3
};

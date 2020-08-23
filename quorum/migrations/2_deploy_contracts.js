const config = require("../config/config");
const buyer = artifacts.require("Buyer");
const seller = artifacts.require("Seller");
const fs = require("fs");

module.exports = async function (deployer) {
    let buyerDeployedContractAddress;
    let sellerDeployedContractAddress;

    await deployer.deploy(buyer).then(async function (receipt) {
        buyerDeployedContractAddress = receipt.address;
        console.log("The deployed Buyer contract address is:", buyerDeployedContractAddress);
    });

    await deployer.deploy(seller).then(async function (receipt) {
        sellerDeployedContractAddress = receipt.address;
        console.log("The deployed Seller contract address is:", sellerDeployedContractAddress);
    });

    // Save addresses in external file
    const contractAddresses = [
        {
            filename: "./contractAddresses/BuyerDeployedContractAddress.txt",  
            content: buyerDeployedContractAddress
        },
        {
            filename: "./contractAddresses/SellerDeployedContractAddress.txt",  
            content: sellerDeployedContractAddress
        }
    ]

    // Loop through each contract and write its address to a separate file
    contractAddresses.map(function (obj) {
        writeContractddressToFile(obj);
    });
}

/**
 * Function that writes an the contents of an object in a new file
 * @param obj: object containing file name and content
 * @returns null
 */
function writeContractddressToFile(obj) {
    fs.writeFileSync(obj.filename, obj.content, function (err) {
        if (err) console.log("Error in writeFileSync (writeAContractddressToFile)", err);
        console.log("Contract address saved to file.");
    });
}
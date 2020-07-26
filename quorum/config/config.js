const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const privateTxPublicKeys = {
    bankNodePubKey: process.env.BANKNODE_PUBKEY,
    buyerNodePubKey: process.env.BUYERNODE_PUBKEY,
    supplierNodePubKey: process.env.SUPPLIERNODE_PUBKEY
};
const absConfig = {
    address: process.env.ADDRESS,
    password: process.env.PASSWORD,
    provider: process.env.PROVIDER
};
module.exports = { privateTxPublicKeys, absConfig };

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const privateTxPublicKeys = {
    buyerNodePubKey: process.env.BUYERNODE_PUBKEY,
    supplierNodePubKey: process.env.SUPPLIERNODE_PUBKEY,
    warehouseNodePubKey: process.env.WAREHOUSENODE_PUBKEY
};
const absConfig = {
    address: process.env.ADDRESS,
    password: process.env.PASSWORD,
    provider: process.env.PROVIDER
};
module.exports = { privateTxPublicKeys, absConfig };

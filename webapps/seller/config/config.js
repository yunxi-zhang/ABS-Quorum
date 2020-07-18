const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const absConfig = {
    address: process.env.ADDRESS,
    password: process.env.PASSWORD,
    httpsProvider: process.env.PROVIDER,
};

module.exports = {
    absConfig
}
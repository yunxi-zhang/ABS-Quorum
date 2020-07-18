var express = require('express');
var cors = require('cors');
const buyerContract = require('../invokeContracts/buyerContract');
var router = express.Router();
router.use(express.json());
router.use(cors());

router.get("/balance", async (req, res) => {
    const balance = await buyerContract.getBalance();
    res.json({"balance": balance});
});

module.exports = router;
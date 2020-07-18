var express = require('express');
var cors = require('cors');
var router = express.Router();
const sellerContract = require('../invokeContracts/sellerContract');
router.use(express.json());
router.use(cors());

router.get("/balance", async (req, res, next) => {
    const balance = await sellerContract.getBalance();
    res.json({"balance": balance});
});

router.post("/updateBalance", async (req, res) => {
    const contractReceipt = await sellerContract.updateBalance(req.body.value);
    res.json({"status": 'success', transactionId: contractReceipt})
});

module.exports = router;
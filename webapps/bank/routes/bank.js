var express = require('express');
var cors = require('cors');
var router = express.Router();
router.use(express.json());
router.use(cors());

router.get("/sellerBalance", async (req, res, next) => {
    res.json({"api":"sellerBalance"});
});

router.get("/buyerBalance", async (req, res, next) => {
    res.json({"api":"buyerBalance"});
});

module.exports = router;
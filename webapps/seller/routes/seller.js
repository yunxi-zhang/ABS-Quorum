var express = require('express');
var cors = require('cors');
var router = express.Router();
router.use(express.json());
router.use(cors());

router.get("/balance", async (req, res, next) => {
    res.json({"api":"balance"});
});

module.exports = router;
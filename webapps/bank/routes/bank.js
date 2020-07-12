var express = require('express');
var cors = require('cors');
var router = express.Router();
router.use(express.json());
router.use(cors());
const dotenv = require('dotenv');
dotenv.config();
let appInsights = require('applicationinsights');
appInsights.setup()
.setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(true)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
    .start();

router.get("/sellerBalance", async (req, res, next) => {
    res.json({"api":"sellerBalance"});
});

router.get("/buyerBalance", async (req, res, next) => {
    res.json({"api":"buyerBalance"});
});

module.exports = router;
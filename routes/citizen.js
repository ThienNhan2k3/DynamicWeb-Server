const express = require("express");
const citizenController = require("../controllers/citizen.js");

const router = express.Router();

router.get("/get-sipulated", citizenController.getSipulated);
router.get("/get-nonsipulated", citizenController.getNonSipulated);
router.get("/get-report", citizenController.getReport);
router.get("/get-ads/:placementId", citizenController.getAds);
router.post("/post-report", citizenController.postReport);
router.get("/get-report-data", citizenController.getReportData);
router.post("/post-self-report", citizenController.postSelfReport);

module.exports = router;

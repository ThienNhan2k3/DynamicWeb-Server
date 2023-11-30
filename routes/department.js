const express = require("express");
const controller = require("../controllers/department");
const router = express.Router();

router.get("/accountManagement", controller.accountManagement);
router.get("/accountManagement/api/wards", controller.getWardsWithSpecificDistrict);
router.post("/register", controller.createAccount);

module.exports = router;
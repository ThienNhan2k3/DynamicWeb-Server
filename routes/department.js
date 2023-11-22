const express = require("express");
const controller = require("../controllers/department");
const router = express.Router();

router.get("/accountManagement", controller.accountManagement);

module.exports = router;
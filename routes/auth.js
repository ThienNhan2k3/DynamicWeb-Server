const express = require("express");
const authController = require("../controllers/auth.js");
const auth = require("../controllers/auth.js");

const router = express.Router();

router.get("/forget-password", authController.getForgetPassword);

module.exports = router;
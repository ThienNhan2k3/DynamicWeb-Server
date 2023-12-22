const express = require("express");
const authController = require("../controllers/auth.js");
const { authUser } = require("../middlewares/authentication.js");

const router = express.Router();

router.get("/", authController.getLogin);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/logout", authUser, authController.getLogout);
router.get("/changePassword", authUser, authController.changePassword);
router.get("/changeInfor", authUser, authController.changeInfor);

router.get("/forget-password", authController.getForgetPassword);

router.post("/forget-password", authController.postForgetPassword);
router.get("/otp-waiting", authController.getOtpWaiting);
router.post("/otp-waiting", authController.postOtpWaiting);
router.get("/reset-password", authController.getResetPassword);
router.post("/reset-password", authController.postResetPassword);

module.exports = router;

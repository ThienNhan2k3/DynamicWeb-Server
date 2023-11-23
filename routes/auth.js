const express = require("express");
const authController = require("../controllers/auth.js");

const router = express.Router();

router.get("/", authController.getLogin);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.getLogout);

router.get("/forget-password", authController.getForgetPassword);

router.post("/forget-password", authController.postForgetPassword);
// router.post("/forget-password",(req,res)=>{
//     console.log("HMM")
//     return res.redirect("/forget-password")
// })
router.get("/otp-waiting", authController.getOtpWaiting);
router.post("/otp-waiting", authController.postOtpWaiting);
router.get("/reset-password", authController.getResetPassword);
router.post("/reset-password", authController.postResetPassword);

module.exports = router;

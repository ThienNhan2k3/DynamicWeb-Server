const express = require("express");
const authController = require("../controllers/auth.js");
const { authUser } = require("../middlewares/authentication.js");
const passport = require("passport");
const controller = require("../controllers/departmentController.js");
const router = express.Router();

router.get("/", authController.getLogin);
router.get("/login", authController.getLogin);
router.post("/login", passport.authenticate('local', {
    failureRedirect: "/login",
    failureFlash: true 
}), authController.postLogin);

router.get("/login/google", passport.authenticate("google", {
    scope: ['profile', 'email']
}));
router.get("/login/google/redirect", passport.authenticate("google", {
    failureRedirect: "/login",
    failureFlash: true 
}), authController.postLogin);

router.get("/login/facebook", passport.authenticate("facebook", {scope : ['email'] }));
router.get("/login/facebook/callback", passport.authenticate("facebook", {
    failureRedirect: "/login",
    failureFlash: true 
}), authController.postLogin);


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

const express = require("express");
const authController = require("../controllers/auth.js");

const router = express.Router();

router.get('/', authController.getLogin);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.getLogout);


router.get("/forget-password", authController.getForgetPassword);

module.exports = router;
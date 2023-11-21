import express from "express";
import authController from "../controllers/auth.js";
import auth from "../controllers/auth.js";

const router = express.Router();

router.get("/forget-password", authController.getForgetPassword);

export default router
import express from "express";
import { login, logout, register,googleLogin } from "../controllers/userController.js";


const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/google-login").post(googleLogin);
router.route("/logout").get(logout);

export default router;
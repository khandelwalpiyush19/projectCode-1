import express from "express";
import { getUser, updateUser } from "../controllers/userProfileController.js";
import upload from "../config/multer.js";

const router = express.Router();
router.route("/get-user/:userid").get(getUser);
router.route("/update-user/:userid").put(upload.single('file'), updateUser);

export default router;
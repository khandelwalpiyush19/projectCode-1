import express from "express";
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "../controllers/blogController.js";
import isAuthenticated from "../middlewares/auth.middleware.js";



const router = express.Router();

router.route("/").post(isAuthenticated,createBlog).get(isAuthenticated,getAllBlogs);
router.route("/:id").put(isAuthenticated,updateBlog).delete(isAuthenticated,deleteBlog);

export default router;
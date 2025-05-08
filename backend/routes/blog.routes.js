import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";
import {
  allBlogs,
  createBlog,
  deleteBlog,
  editBlog,
  userBlogs,
} from "../controllers/blog.controller.js";
const router = express.Router();
router.post("/create", isAuthenticated, upload.single("image"), createBlog);
router.get("/all", allBlogs);
router.delete("/delete/:id", isAuthenticated, deleteBlog);
router.get("/user/blogs", isAuthenticated, userBlogs);
router.put("/edit/:id", isAuthenticated, upload.single("image"), editBlog);
export default router;
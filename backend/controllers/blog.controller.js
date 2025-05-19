import Blog from "../models/blog.model.js";
import fs from "fs";

// Get all blogs
export const allBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ blogs, success: true, message: "All blogs" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    const image_filename = req.file?.filename;

    const blog = await Blog.create({
      title,
      category,
      description,
      image: image_filename,
      author: {
        id: req.user._id,
        name: req.user.name,
        image: req.user.image,
      },
    });

    return res.status(201).json({ message: "Blog created", success: true, blog });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Edit blog
export const editBlog = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found", success: false });
    }

    if (blog.author.id.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "Not authorized to edit this blog",
        success: false,
      });
    }

    // If new image uploaded
    if (req.file) {
      if (blog.image) {
        fs.unlink(`uploads/${blog.image}`, (err) => {
          if (err) console.log("Failed to delete old image:", err);
        });
      }
      blog.image = req.file.filename;
    }

    // Update blog fields
    blog.title = title || blog.title;
    blog.category = category || blog.category;
    blog.description = description || blog.description;

    await blog.save();

    return res.status(200).json({ message: "Blog updated successfully", success: true, blog });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ✅ Fixed deleteBlog function
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found", success: false });
    }

    if (blog.author.id.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this blog", success: false });
    }

    // Delete image if exists
    if (blog.image) {
      fs.unlink(`uploads/${blog.image}`, (err) => {
        if (err) {
          console.error("Failed to delete image:", err);
        }
      });
    }

    await blog.deleteOne();

    return res.status(200).json({ message: "Blog deleted successfully", success: true });
  } catch (error) {
    console.error("Delete blog error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Get a single blog
export const singleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    return res.status(200).json({ message: "Blog found", success: true, blog });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Get blogs by user
export const userBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ "author.id": req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "User's blogs retrieved successfully",
      blogs,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getMyBlogs = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming auth middleware attaches `user` to `req`

    const myBlogs = await Blog.find({ author: userId });

    res.status(200).json({ blogs: myBlogs });
  } catch (error) {
    console.error("Error fetching user's blogs:", error);
    res.status(500).json({ message: "Failed to fetch your blogs" });
  }
};

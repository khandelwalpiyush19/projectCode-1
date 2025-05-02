import { Blog } from "../models/blogModel.js";

export const createBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const blog = await Blog.create({ title, description });
        return res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog
        });


    } catch (error) {
        console.log(error)
    }
}
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        return res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            blogs
        });
    } catch (error) {
        console.log(error)
    }
}

export const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id;

        const { title, description } = req.body;

        // Correctly update the blog post
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            { title, description },
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: blog
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findByIdAndDelete(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (error) {
        console.log(error)

    }
}
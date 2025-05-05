import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    title: {type:String, require: true},
    image: {type:String},
    category: {type:String, require: true},
    description: {type:String, require: true},
    author: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
        name: {
            type: String,
            require: true
        },
        image: {
            type: String
        }
    }
},{timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
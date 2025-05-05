import React from "react";
import { blogData } from "../assets/assets";
import BlogCard from "./BlogCard";

function LatestBlogs() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-700 text-center sm:text-start">
        Latest Blogs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 sm:px-4">
        {blogData.map((blog, index) => (
          <BlogCard
            key={index}
            id={blog.id}
            title={blog.title}
            image={blog.image}
            category={blog.category} 
            author_name={blog.author.name}
            author_image={blog.author.image}
            date={blog.date}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestBlogs;

import { useContext } from "react";
import BlogCard from "./BlogCard";
import { StoreContext } from "../context/StoreContext";
const LatestBlogs = () => {
  const { blogData } = useContext(StoreContext);
  return (
    <div>
      <h1 className="text-3xl my-3 text-gray-700 font-bold text-center sm:text-start">
        Latest Blogs
      </h1>
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 sm:px-4">
        {blogData
          .slice(-6)
          .reverse()
          .map((blog, index) => (
            <BlogCard
              key={index}
              id={blog._id}
              title={blog.title}
              image={`http://localhost:4000/images/${blog.image}`}
              category={blog.category}
              author_name={blog.author.name}
              author_image={`http://localhost:4000/images/${blog.author.image}`}
              date={new Date(blog.createdAt).toLocaleDateString()}
            />
          ))}
      </div>
    </div>
  );
};
export default LatestBlogs;
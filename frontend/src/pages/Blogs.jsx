import { useContext, useState, useEffect } from "react";
import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import { StoreContext } from "../context/StoreContext";

function Blogs() {
  const { blogData } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogData);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBlogs(blogData);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = blogData.filter(
        (blog) =>
          blog.title.toLowerCase().includes(lowerQuery) ||
          blog.description?.toLowerCase().includes(lowerQuery) ||
          blog.category?.toLowerCase().includes(lowerQuery) ||
          blog.author?.name?.toLowerCase().includes(lowerQuery)
      );
      setFilteredBlogs(filtered);
    }
  }, [searchQuery, blogData]);

  return (
    <div>
      <Hero />
      <h1 className="text-3xl text-center font-bold my-6">All Blogs</h1>

      <div className="max-w-xl mx-auto mb-4 px-3">
        <input
          type="text"
          placeholder="🔍 Search blogs by title, category, author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <p className="text-base px-3 sm:text-lg leading-6 max-w-2xl mx-auto">
        Discover insightful blog posts from various categories.
      </p>

      <div className="grid my-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 sm:px-4">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, index) => (
            <BlogCard
              key={index}
              id={blog._id}
              title={blog.title}
              image={`http://localhost:4000/images/${blog.image}`}
              category={blog.category}
              author_name={blog.author.name}
              author_image={`http://localhost:4000/images/${blog.author.image}`}
              date={new Date(blog.createdAt).toISOString().split("T")[0]}
              description={blog.description} // ✅ Add this line
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No blogs matched your search.
          </p>
        )}
      </div>
    </div>
  );
}

export default Blogs;

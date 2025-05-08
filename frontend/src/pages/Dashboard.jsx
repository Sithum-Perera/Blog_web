import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("list");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modalBlog, setModalBlog] = useState(null);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:4000/blog/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data.blogs);
      setFilteredBlogs(res.data.blogs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    let temp = blogs;

    if (categoryFilter !== "All") {
      temp = temp.filter((b) =>
        b.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    if (searchQuery.trim() !== "") {
      temp = temp.filter((b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBlogs(temp);
  }, [searchQuery, categoryFilter, blogs]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    try {
      let res;
      if (isEditing) {
        res = await axios.put(
          `http://localhost:4000/blog/edit/${editBlogId}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(res.data.message);
      } else {
        res = await axios.post("http://localhost:4000/blog/create", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success(res.data.message);
      }

      setFormData({ title: "", category: "", description: "", image: null });
      setImagePreview(null);
      setIsEditing(false);
      setEditBlogId(null);
      fetchBlogs();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const removeBlog = async (blogId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/blog/delete/${blogId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message);
      fetchBlogs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      category: blog.category,
      description: blog.description,
      image: null,
    });
    setImagePreview(null);
    setEditBlogId(blog._id);
    setIsEditing(true);
    setActiveTab("post");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">📘 Dashboard</h2>
        <button
          className={`w-full text-left py-2 px-4 mb-2 rounded transition ${
            activeTab === "post" ? "bg-orange-500" : "hover:bg-gray-700"
          }`}
          onClick={() => {
            setActiveTab("post");
            setIsEditing(false);
            setFormData({ title: "", category: "", description: "", image: null });
            setImagePreview(null);
          }}
        >
          ✍️ {isEditing ? "Edit Blog" : "Post a Blog"}
        </button>
        <button
          className={`w-full text-left py-2 px-4 rounded transition ${
            activeTab === "list" ? "bg-orange-500" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("list")}
        >
          📄 Blog List
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "post" ? (
          <div className="max-w-xl">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Blog" : "Post a New Blog"}
            </h2>
            <form onSubmit={submitHandler} className="flex flex-col gap-4">
              <input
                name="title"
                value={formData.title}
                onChange={onChangeHandler}
                type="text"
                placeholder="Title"
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                name="category"
                value={formData.category}
                onChange={onChangeHandler}
                type="text"
                placeholder="Category"
                className="border border-gray-300 rounded-md p-2"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={onChangeHandler}
                placeholder="Description"
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="file"
                onChange={fileHandler}
                accept="image/*"
                className="border border-gray-300 p-2"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded border"
                />
              )}
              <button className="bg-black text-white py-2 rounded hover:bg-gray-800">
                {isEditing ? "Update Blog" : "Post Blog"}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">All Blogs</h2>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title..."
                className="p-2 border border-gray-300 rounded-md"
              />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="All">All Categories</option>
                {[...new Set(blogs.map((b) => b.category))].map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Blog Table */}
            <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
  <thead>
    <tr className="bg-gray-100">
      <th className="border px-4 py-2">Title</th>
      <th className="border px-4 py-2">Category</th>
      <th className="border px-4 py-2">Image</th>
      <th className="border px-4 py-2">Edit</th>
      <th className="border px-4 py-2">Delete</th>
      <th className="border px-4 py-2">View</th>
    </tr>
  </thead>
  <tbody>
    {filteredBlogs.map((blog) => (
      <tr key={blog._id} className="text-center hover:bg-gray-50">
        <td className="border px-4 py-2">{blog.title}</td>
        <td className="border px-4 py-2">{blog.category}</td>
        <td className="border px-4 py-2">
          <img
            src={`http://localhost:4000/images/${blog.image}`}
            alt={blog.title}
            className="w-16 h-16 object-cover mx-auto rounded"
          />
        </td>
        <td className="border px-4 py-2">
          <button className="cursor-pointer" onClick={() => handleEdit(blog)}>
            ✍️ Edit
          </button>
        </td>
        <td className="border px-4 py-2">
          <button className="cursor-pointer" onClick={() => removeBlog(blog._id)}>
            🗑️ Delete
          </button>
        </td>
        <td className="border px-4 py-2">
          <button className="cursor-pointer" onClick={() => setModalBlog(blog)}>
            👁️ View
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

              {modalBlog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg w-96 max-w-full relative">
                    <h3 className="text-xl font-bold mb-2">{modalBlog.title}</h3>
                    <p className="text-sm text-gray-500 mb-1">
                      Category: {modalBlog.category}
                    </p>
                    <img
                      src={`http://localhost:4000/images/${modalBlog.image}`}
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                    <p>{modalBlog.description}</p>
                    <button
                      className="absolute top-2 right-2 text-lg font-bold"
                      onClick={() => setModalBlog(null)}
                    >
                      ✖️
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

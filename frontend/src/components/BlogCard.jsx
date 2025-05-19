import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({
  id,
  title,
  category,
  image,
  author_image,
  author_name,
  date,
  description,
}) {
  return (
    <div className="border border-gray-300 shadow-md p-4 rounded-md transition hover:shadow-lg">
      <Link to={`/blog/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover rounded-md cursor-pointer transform transition duration-300 hover:scale-105"
        />
        <p className="text-[#4B6BFB] font-semibold mt-4">{category}</p>
        <h1 className="text-xl font-bold mt-1">{title}</h1>
        <p className="text-gray-700 mt-2">
          {description?.length > 100 ? description.slice(0, 100) + '...' : description}
        </p>
      </Link>

      <div className="flex gap-3 items-center mt-4">
        <img
          src={author_image}
          alt={author_name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="text-base font-semibold text-gray-600">{author_name}</p>
        <p className="text-sm text-gray-500 ml-auto">{date}</p>
      </div>
    </div>
  );
}

export default BlogCard;

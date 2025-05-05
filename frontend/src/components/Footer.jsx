import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <>
      <div className="flex flex-col py-12 md:flex-row items-center justify-between">
        <div className="w-full items-center flex flex-col justify-center px-2 sm:w-1/3 gap-2">
          <h1 className="text-xl font-bold text-gray-700">ABOUT</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, error
            vel consequatur reprehenderit libero perspiciatis odit in velit vero
            unde! Enim tempore earum repellat tenetur voluptatum voluptates
            soluta aliquam iure!
          </p>
          <h4 className="text-lg font-normal">Email: Example@gmail.com</h4>
          <h4 className="text-lg font-normal">Phone: 0123456789</h4>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-700 mb-5">QUIK LINKS</h1>
          <ul className="flex flex-col gap-2">
            <Link to="/" className="cursor-pointer hover:text-green-400">
              HOME
            </Link>
            <Link to="/" className="cursor-pointer hover:text-green-400">
              BLOGS
            </Link>
            <Link to="/" className="cursor-pointer hover:text-green-400">
              ABOUT
            </Link>
            <Link to="/" className="cursor-pointer hover:text-green-400">
              CONTACT
            </Link>
          </ul>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-700 mb-5">CATEGORIES</h1>
          <ul className="flex flex-col gap-2">
            <Link to="/" className="cursor-pointer hover:text-green-400">
              WEATHER
            </Link>
            <Link to="/blogs" className="cursor-pointer hover:text-green-400">
              LIFESTYLE
            </Link>
            <Link to="/about" className="cursor-pointer hover:text-green-400">
              TECHNOLOGY
            </Link>
            <Link to="/contact" className="cursor-pointer hover:text-green-400">
              NEWS
            </Link>
          </ul>
        </div>
      </div>
      <hr className="h-0.5 text-gray-600 bg-gray-700 w-full" />
      <div className="flex justify-between items-center my-6">
        <div className="flex gap-2 items-center justify-center">
            <img src={assets.logo} alt="" className="w-[50px] h-[20px]" />
        </div>
        <ul className="flex gap-3">
            <li>Privacy Policy</li>
            <li>Terms and Condition</li>
            <li>Copyright @code catch me</li>
        </ul>
      </div>
    </>
  );
}

export default Footer;

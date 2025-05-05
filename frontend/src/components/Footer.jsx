import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="flex flex-col py-12 md:flex-row items-center justify-between">
      <div className="w-full items-center flex flex-col justify-center px-2 sm:w-1/3 gap-2">
        <h1 className="text-xl font-bold text-gray-700">About</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, error vel
          consequatur reprehenderit libero perspiciatis odit in velit vero unde!
          Enim tempore earum repellat tenetur voluptatum voluptates soluta
          aliquam iure!
        </p>
        <h4 className="text-lg font-normal">Email: Example@gmail.com</h4>
        <h4 className="text-lg font-normal">Phone: 0123456789</h4>
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-700">Quik Links</h1>
        <ul className="flex flex-col gap-2">
            <Link to='/'>Home</Link>
            <Link to='/blogs'>BLOGS</Link>
            <Link to='/about'>ABOUT</Link>
            <Link to='/contact'>CONTACT</Link>
        </ul>
      </div>
      <div></div>
    </div>
  );
}

export default Footer;

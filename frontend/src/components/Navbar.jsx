import React, { useContext } from 'react'
import { assets } from "../assets/assets";
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

function Navbar() {
  const { user, logoutUser } = useContext(StoreContext);
  return (
    <nav className='bg-white p-4 sticky top-0  border-b border-gray-400 shadow-md'>
      <div className='flex container mx-auto justify-between items-center'>
        <div className='flex gap-2 items-center'>
        <Link to='/'>
          <img src={assets.logo} alt="" className='w-[100px] h-[60px]'/>
        </Link>
        </div>
        <ul className='hidden sm:flex gap-5 text-xl front-normal justify-center items-center text-gray-700'>
          <Link to='/' className='cursor-pointer hover:text-green-400'>HOME</Link>
          <Link to='/blogs' className='cursor-pointer hover:text-green-400'>BLOGS</Link>
          <Link to='/about' className='cursor-pointer hover:text-green-400'>ABOUT</Link>
          <Link to='/contact' className='cursor-pointer hover:text-green-400'>CONTACT</Link>
        </ul>
        {user ? (
          <div className="flex gap-2">
            <Link
              to={"/dashboard"}
              className="bg-black px-6 py-2 rounded-full text-white"
            >
              Dashboard
            </Link>
            <button
              onClick={logoutUser}
              className="bg-green-500 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-green-600 duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to={"/login"}
            className='bg-green-500 text-white px-8 py-2 rounded-full cursor-pointer hover:bg-green-600 duration-300'
          >
            Signin
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
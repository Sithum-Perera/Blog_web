import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='w-full bg-green-200 py-12 mx-auto flex items-center justify-center'>
      <div className='w-full bg-white max-w-md p-5 mx-auto py-6 border-1 border-gray-200 shadow-md'>
        <div className=''><img src={assets.logo} alt="" className='w-[90px] h-[50px] '/></div>
        <h1 className='text-lg font-bold text-center text-gray-700'>Login into your account</h1>
        <form className='flex flex-col gap-5 mt-5 w-full'>
          <input type="email" placeholder='Your email' className='w-full p-2 border border-gray-300 rounded outline-none' required />
          <input type="password" placeholder='Your paassword' className='w-full p-2 border border-gray-300 rounded outline-none' required />
          <button className='bg-orange-600 text-white px-6 py-2 w-full cursor-pointer'>Sign in</button>
        </form>
        <p className='mt-3 text-center'>Don't have an accout? {""}<Link to={'/register'} className='text-blue-700 cursor-pointer'>Register here</Link></p>{""}
      </div>
    </div>
  )
}

export default Login
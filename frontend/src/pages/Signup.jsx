import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  return (
    <div className='w-full bg-green-200 py-12 mx-auto flex items-center justify-center'>
      <div className='w-full bg-white max-w-md p-5 mx-auto py-6 border-1 border-gray-200 shadow-md'>
        <div className=''><img src={assets.logo} alt="" className='w-[90px] h-[50px] '/></div>
        <h1 className='text-lg font-bold text-center text-gray-700'>Create your account</h1>
        <form className='flex flex-col gap-5 mt-5 w-full'>
          <input onChange={onChangeHandler} name='name' value={formData.name} type="text" placeholder='Your name' className='w-full p-2 border border-gray-300 rounded outline-none' required />
          <input onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Your email' className='w-full p-2 border border-gray-300 rounded outline-none' required />
          <input onChange={onChangeHandler} name='password' value={formData.password} type="password" placeholder='Your paassword' className='w-full p-2 border border-gray-300 rounded outline-none' required />
          <input onChange={fileHandler} accept='image/*' type="file" className='w-full p-2 border border-gray-300 rounded outline-none' required />
          <button className='bg-orange-600 text-white px-6 py-2 w-full cursor-pointer'>Sign up</button>
        </form>
        <p className='mt-3 text-center'>Already have accout? <Link to={'/login'} className='text-blue-700 cursor-pointer'>Login here</Link></p>{""}
      </div>
    </div>
  )
}

export default Signup
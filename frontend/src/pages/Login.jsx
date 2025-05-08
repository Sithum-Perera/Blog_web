import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loginUser } = useContext(StoreContext);
  const token = localStorage.getItem("token");

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4000/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res", res);
      if (res.data.success) {
        const { user, token } = res.data;
        loginUser(user, token);
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full bg-green-200 py-12 mx-auto flex items-center justify-center'>
      <div className='w-full bg-white max-w-md p-5 mx-auto py-6 border-1 border-gray-200 shadow-md'>
        <div className=''><img src={assets.logo} alt="" className='w-[90px] h-[50px] '/></div>
        <h1 className='text-lg font-bold text-center text-gray-700'>Login into your account</h1>
        <form onSubmit={submitHandler} className='flex flex-col gap-5 mt-5 w-full'>
          <input name='email' value={formData.email} onChange={onChangeHandler} type="email" placeholder='Your email' className='w-full p-2 border border-gray-300 rounded outline-none' required />
          <input name='password' value={formData.password} onChange={onChangeHandler} type="password" placeholder='Your paassword' className='w-full p-2 border border-gray-300 rounded outline-none' required />
          <button className='bg-orange-600 text-white px-6 py-2 w-full cursor-pointer'>Sign in</button>
        </form>
        <p className='mt-3 text-center'>Don't have an accout? {""}<Link to={'/register'} className='text-blue-700 cursor-pointer'>Register here</Link></p>{""}
      </div>
    </div>
  )
}

export default Login
import React from 'react'
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")); 
    const handleLogout = () => {
      localStorage.clear(); 
      navigate("/login"); 
    };

  return (
    <div className='mt-20'>
    <h6 className='text-center font-semibold text-2xl'>My Account</h6>
    <div className='border border-gray-300 mt-5 sm:mx-20 md:mx-40 h-[70vh] rounded-md flex flex-col items-center justify-center'>
      <div className='rounded-full'>
        <img src={`https://avatars.githubusercontent.com/u/90741749?v=4`} alt="" className="w-60 h-60 rounded-full" />
      </div>
      <p className="mt-8 font-semibold text-lg text-black-500 " >{user?.name}</p>
      {
        user?
        <button className=' bg-blue-500 text-white px-4 py-1.5 mt-2 rounded-md cursor-pointer ' onClick={handleLogout}>Logout</button>
        :
        <button className=' bg-blue-500 text-white px-4 py-1.5 mt-2 rounded-md cursor-pointer ' onClick={()=>navigate("/login")}>Login</button>
      }
    </div>
  </div>
  
  )
}

export default MyAccount

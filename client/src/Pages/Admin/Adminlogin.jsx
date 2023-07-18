import React, { useState } from 'react';

import admin from '../../assets/super.jpg';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAdminLogin } from '../../Hooks/Admin/useAdminLogin';

import { toast } from 'react-toastify';

function Adminlogin() {

    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const {login,error,isLoading} = useAdminLogin();
    


    const loginAdmin = async (e) => {
        e.preventDefault();
        try {
          const response =await login(email, password);
          
          const { success, token, message } = response.data;
          if (success === true) { 
            toast.success("login successfully");
          } else {
            toast.error("Invalid login details");
          }
         
        } catch (error) {
        //   toast.error("Invalid login details");
        }
   


        
    }
  return (
   <div>
       <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <img src={admin} className='w-40 h-40 mx-auto'/>
            <h1 className="text-3xl  text-center text-gray-900 font-bold ">
                   Welcome, Login Here!
                </h1>
                <form className="mt-6"  onSubmit={loginAdmin}>
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-900"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                        
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name="password"
                        />
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-900 rounded-md" type="submit">Login
                          
                        </button>
                      
                        <div className="mt-6 flex justify-center">
                        <p className="flex items-center">
                Don't have account?
                <span className="p-2 underline">
                  <NavLink to="/vendor/vendorSign">sign up </NavLink>
                </span>
              </p>
        </div>

                      
                    </div>

                </form>
            </div>
        </div> 
    
   </div>
  )
}

export default Adminlogin
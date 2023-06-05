import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import admin from "../../assets/super.jpg";
import { useSuperLogin } from "../../Hooks/Superadmin/useSuperLogin";
import { toast } from "react-toastify";

function Superlogin() {
  const { login, error, isloading } = useSuperLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('hiiiii');
    try {
      const response = await login(email, password);

      toast.success("login successful")
      }
     catch (error) {
      // toast.error("Invalid login details");
    }
  }    

  return (
    <div>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <img src={admin} className="w-40 h-40 mx-auto" alt="admin logo" />

          <h1 className="text-3xl  text-center text-gray-900 font-bold ">
            Welcome, Login Here!
          </h1>
          <form className="mt-6" onSubmit={handleLogin}>
            <div className="mb-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-6">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-900 rounded-md "
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Superlogin;

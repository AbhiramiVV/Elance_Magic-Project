import React, { useState, useEffect } from "react";
import { CgMenuRight, CgClose } from "react-icons/cg";
import { IoMdLock } from "react-icons/io";
import { useLogout } from "../Hooks/User/useLogout";


import { CalendarIcon } from '@heroicons/react/solid';

// Initialization for ES Users

// import logo
import logo from "../assets/logo.jpg";
// import data
import { navigation } from "../data";
// import components
import NavMobile from "./NavMobile";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";
const Header = () => {
  const{logout}=useLogout()
  
  const { user } = useAuthContext();
  const [bg, setBg] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const handlelogout=()=>{
    logout()
    
  }
  

   
  useEffect(() => {
    // add event listener
    window.addEventListener("scroll", () => {
      // when scrollY is bigger than 50px setBg to true, else false
      return window.scrollY > 50 ? setBg(true) : setBg(false);
    });
  });
  return (
    <header
      className={`${
        // if bg is true
        bg
          ? "bg-white py-4 lg:py-6"
          : // if bg is false
            "bg-white"
      }
    fixed left-0 py-8 z-10 w-full  transition-all duration-200`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* logo */}
        
            <h1 className=" text-5xl font-extrabold font-secondary mr-90 mt-2italic text-gray-900"  > 
              Enlance Magico
            </h1>
         
          {/* menu icon */}
          <div
            onClick={() => setMobileNav(!mobileNav)}
            className="md:hidden text-2xl lg:text-3xl text-white cursor-pointer"
          >
            {mobileNav ? <CgClose /> : <CgMenuRight />}
          </div>
          {/* nav */}
          <nav className="hidden md:flex">
            <ul className="md:flex md:gap-x-4">
              
                             <NavLink to="/">
                      <button
  type="button"
  class="inline-block rounded-full border-2 border-neutral-800 px-6 pb-[6px] pt-2 text-md font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800 focus:border-neutral-800 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 dark:border-neutral-900 dark:text-neutral-900 dark:hover:border-neutral-900 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 dark:hover:text-neutral-900 dark:focus:border-neutral-900 dark:focus:text-neutral-900 dark:active:border-neutral-900 dark:active:text-neutral-900"
  data-te-ripple-init>
    HOME

</button></NavLink>

<NavLink to="/vendor/vendor">
                      <button
  type="button"
  class="inline-block rounded-full border-2 border-neutral-800 px-6 pb-[6px] pt-2 text-md font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800 focus:border-neutral-800 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 dark:border-neutral-900 dark:text-neutral-900 dark:hover:border-neutral-900 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 dark:hover:text-neutral-900 dark:focus:border-neutral-900 dark:focus:text-neutral-900 dark:active:border-neutral-900 dark:active:text-neutral-900"
  data-te-ripple-init>
 EVENT MANAGEMENT

</button></NavLink>


                    




                   
              <li>
                {!user && (
                
                  <NavLink to="/login">
                   
                    <h1 className="capitalize text-gray-900 text-3xl w-10 h-10 font-bold hover:border-b">
                    <IoMdLock className="mr-8 w-12 h-12"/>
</h1>

                  </NavLink>
                )}
                {user && (
          
                  <NavLink to="/">
                   
                    <button
  type="button"
  class="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]" onClick={handlelogout}>
 LOGOUT
</button>
                  </NavLink>
               

                )}
              

              </li>
             
            </ul>
            <ul>
              <li></li>
            </ul>
          </nav>
          {/* nav mobile */}
          <div
            className={`${
              mobileNav ? "left-0" : "-left-full"
            } md:hidden fixed bottom-0 w-full max-w-xs h-screen transition-all`}
          >
            <NavMobile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

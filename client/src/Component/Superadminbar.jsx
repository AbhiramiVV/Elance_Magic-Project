import React,{useEffect, useState} from 'react'
import {HiMenuAlt3} from "react-icons/hi";
import {MdOutlineDashboard} from "react-icons/md";
import {GiPartyPopper} from "react-icons/gi";
import {FaUserAlt} from "react-icons/fa";
import {IoIosLogOut} from "react-icons/io";
import { Link } from 'react-router-dom';
import {GiPartyHat} from "react-icons/gi";
import {FaHotel} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from '../instance/axios'

import { useSuperLogout } from '../Hooks/Superadmin/useSuperLogout';
import { useAuthContext } from '../Hooks/useAuthContext';
function Superadminbar() {
  const{logout}=useSuperLogout()

 

 
      








  const handlelogout=()=>{
    logout()
  }
    const menus=[
        {name:"Dashboard",link:'/superadmin/dashboard',icon:MdOutlineDashboard },
        
        {name:"Admins",link:'/superadmin/getadmin',icon:FaUserAlt },
        {name:"Venue-Category",link:'/superadmin/showvenuecat',icon:FaHotel },
     
      ];
      const [open,setOpen]=useState(true)




  return (
    <>
    <section className='flex gap-6'>
  <div className={`bg-[#0e0e0e] min-h-screen w-72 ${open ? 'w-72':'w-16'}duration-500 text-gray-100 px-4`}>
    <div className="py-3 flex justify-end">
     <HiMenuAlt3 size={26} className="cursor-pointer" onClick={()=>setOpen(!open)}/>
    </div>
    <div className='mt-4 flex flex-col gap-4 relative'>
      {
        menus?.map((menu,i)=>(
<Link to={menu?.link} key={i} className="flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md">
        <div>
          {React.createElement(menu?.icon,{size:"20"})}
        </div>
        <h2>{menu?.name}</h2>
      </Link>
        ))
      }
       <Link to="/superadmin/" className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md">
             <IoIosLogOut/>
              <h2 onClick={handlelogout}>Logout</h2>
            </Link>
    
 
    </div>
    
  </div>
  
  


</section>



</>
  )
}

export default Superadminbar
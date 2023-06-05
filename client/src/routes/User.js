import React, { Fragment } from "react";
import {Routes,Route, Navigate} from "react-router-dom";
import Homepage from "../Pages/User/Homepage";
import Userlogin from "../Pages/User/Userlogin";
import UserRegister from "../Pages/User/UserRegister";
import Otp from "../Pages/User/Otp";
import { useAuthContext } from "../Hooks/useAuthContext";
import Bookpage from '../Pages/User/Bookpage'
import ChangePassword from "../Component/ChangePassword";
import Forgot from "../Pages/User/Forgot";
function User() {
  const {user}=useAuthContext()
  return (
    <fragments>     
        <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/login' element={!user ?<Userlogin/>:<Navigate to='/'/>}/>
       <Route path='/register' element={<UserRegister/>}/>
         <Route path='/otp' element={<Otp/>}/>
         <Route path='/bookpage' element={<Bookpage/>}/>
         <Route path='/forgotPassword' element={<Forgot/>}/>
         <Route path="changePassword/:userId/:token" element={user != "" ? <Navigate to="/home" /> : <ChangePassword />} />

      
    </Routes>
    </fragments>
   
  ) 
}

export default User



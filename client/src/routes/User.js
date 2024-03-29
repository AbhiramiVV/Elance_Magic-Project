import React, { useEffect} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../Pages/User/Homepage";
import Userlogin from "../Pages/User/Userlogin";
import UserRegister from "../Pages/User/UserRegister";
import Otp from "../Pages/User/Otp";
import { useAuthContext } from "../Hooks/useAuthContext";
import Bookpage from '../Pages/User/Bookpage'
import ChangePassword from "../Component/ChangePassword";
import Forgot from "../Pages/User/Forgot";
import Photographer from "../Pages/User/Photographer";
import Decor from "../Pages/User/Decor";
import Venue from "../Pages/User/Venue";
import Photosingle from "../Pages/User/Photosingle";
import PageNotFound from "../Component/PageNotFound";
import CateringView from "../Pages/User/CateringView";
import Decorsinglepage from "../Pages/User/Decorsinglepage";
import Venusingle from "../Pages/User/Venusingle";
import axios from '../instance/axios'
import CateringSingle from "../Pages/User/CateringSingle";
import MakeupView from "../Pages/User/MakeupView";
import MakeupSingle from "../Pages/User/MakeupSingle";
import Details from "../Pages/User/Details";
import Chat from "../Pages/Chat/Chat";
import OrderSuccess from "../Pages/User/Order";
function User() {



  const {user}=useAuthContext()
  const { dispatch } = useAuthContext()
  useEffect (()=>{
    var userData = localStorage.getItem('user');
    if (userData) {
      let usertoken = JSON.parse(userData);
      axios.get('/checkAuth', {
        headers: {
          Authorization: `${usertoken.token}`,
        },}).then((response)=>{  
    
        // update the auth context
        dispatch({ type: 'LOGIN', payload:response.data})
    
      }).catch((error)=>{
        console.log(error);
      })
    } else {
      console.log('User data not found in local storage');
    }
    
    
  
  },[]);



  return (
    <fragments>     

        <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/login' element={!user ?<Userlogin/>:<Navigate to='/'/>}/>
         <Route path='/register' element={<UserRegister/>}/>
         <Route path='/otp' element={<Otp/>}/>
         <Route path='/bookpage' element={<Bookpage/>}/>
         <Route path='/forgotPassword' element={<Forgot/>}/>
         <Route path="/changePassword" element={user? <Navigate to="/home" /> : <ChangePassword />} />
         <Route path='/photo' element={user ?<Photographer/>:<Navigate to='/login'/>}/>
         <Route path='/photosingle/:id' element={user?<Photosingle/>:<Navigate to='/login'/>}/>
        <Route path='/Decor' element={user?<Decor/>:<Navigate to='/login'/>}/>
        <Route path='/Decorsingle/:id' element={user?<Decorsinglepage/>:<Navigate to='/login'/>}/>
        <Route path='/venue' element={user?<Venue/>:<Navigate to='/login'/>}/>
        <Route path='/venuesingle/:id' element={user?<Venusingle/>:<Navigate to='/login'/>}/>
        <Route path='/catering' element={user?<CateringView/>:<Navigate to='/login'/>}/>
        <Route path='/Catersingle/:id' element={user?<CateringSingle/>:<Navigate to='/login'/>}/>
        <Route path='/makeup' element={user?<MakeupView/>:<Navigate to='/login'/>}/>
        <Route path='/Makeupsingle/:id' element={user?<MakeupSingle/>:<Navigate to='/login'/>}/>
        <Route path='/details' element={user?<Details/>:<Navigate to='/login'/>}/>
        <Route path='/chat' element={user?<Chat/>:<Navigate to='/login'/>}/>
        <Route path='/success' element={user?<OrderSuccess/>:<Navigate to='/login'/>}/>

         <Route path="*" element={<PageNotFound />} />
    </Routes>
      
    </fragments>
   
  ) 
}

export default User



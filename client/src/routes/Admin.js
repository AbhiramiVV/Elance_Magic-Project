import React, { Fragment } from 'react';
import {Routes,Route} from "react-router-dom";
import Dashboard from '../Pages/Admin/Dashboard';
import { Navigate } from 'react-router-dom';
import Adminlogin from '../Pages/Admin/Adminlogin'
import CustomerView from '../Pages/Admin/CustomerView';
import EditProfile from '../Pages/Admin/EditProfile';
import { useAuthContext } from '../Hooks/useAuthContext';
import ProviderSignup from '../Pages/Admin/ProviderSignup';
import ProviderProfile from '../Pages/Admin/ProviderProfile';

function Admin() {
  const {admin}=useAuthContext()
  return (
<fragments>

    <Routes>
     { console.log(admin)}
        <Route path='/vendor'  element={!admin?<Adminlogin/>:<Dashboard/>}/>
        <Route path='/vendorSign' element={<ProviderSignup/>}/>
        <Route path='/dashboard'  element={admin?<Dashboard/>:<Adminlogin/>}/>
        <Route path='/customerview'  element={admin?<CustomerView/>:<Adminlogin/>}/>
        <Route path="/profile" element={<ProviderProfile />} /> 
        <Route path="/editProfile" element={<EditProfile />} />


        
       
       
       </Routes>

    </fragments>
  )
}

export default Admin    
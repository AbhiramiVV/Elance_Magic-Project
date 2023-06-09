import React from 'react';
import {Routes,Route} from "react-router-dom";
import Dashboard from '../Pages/Superadmin/Dashboard'
import Superlogin from '../Pages/Superadmin/Superlogin'
import Adminview from '../Pages/Superadmin/Adminview';
import AdminEdit from '../Pages/Superadmin/AdminEdit';
import Individualview from '../Pages/Superadmin/Individualview';
import { useAuthContext } from '../Hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import PageNotFound from '../Component/PageNotFound';
import CustomerView from  '../Pages/Superadmin/CustomerView'
import Order from '../Pages/Superadmin/Order';
function Superadmin() {
  const {superadmin}=useAuthContext()

  return (
    <fragments>
        <Routes>
        <Route path='/'  element={!superadmin?<Superlogin/>:<Dashboard/>}/>
        <Route path='/dashboard'  element={superadmin ?<Dashboard/>:<Superlogin/>}/>
        <Route path='/customerview'  element={superadmin?<CustomerView/>:<Superlogin/>}/>
        <Route path='/getadmin'  element={superadmin?<Adminview/>:<Superlogin/>}/>
        <Route path='/editadmin/:id'  element={superadmin?<AdminEdit/>:<Superlogin/>}/>
        <Route path='/singleview/:id'  element={superadmin?<Individualview/>:<Superlogin/>}/>
        <Route path='/orders' element={superadmin?<Order/>:<Superlogin/>}/>
        <Route path="*" element={<PageNotFound />} />
       


      
    </Routes>
 
    </fragments>
  )
}

export default Superadmin
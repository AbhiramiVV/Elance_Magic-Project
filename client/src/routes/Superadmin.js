import React from 'react';
import {Routes,Route} from "react-router-dom";
import Dashboard from '../Pages/Superadmin/Dashboard'
import Superlogin from '../Pages/Superadmin/Superlogin'
import Adminview from '../Pages/Superadmin/Adminview';
import Adminadd from '../Pages/Superadmin/Adminadd';
import AdminEdit from '../Pages/Superadmin/AdminEdit';
import Individualview from '../Pages/Superadmin/Individualview';
import { useAuthContext } from '../Hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import PageNotFound from '../Component/PageNotFound';
import TransactionTable from '../Pages/Superadmin/TransactionTable';

function Superadmin() {
  const {superadmin}=useAuthContext()
  console.log(7538541,superadmin)
  return (
    <fragments>
        <Routes>
        <Route path='/'  element={!superadmin?<Superlogin/>:<Dashboard/>}/>
        <Route path='/dashboard'  element={superadmin ?<Dashboard/>:<Superlogin/>}/>
        <Route path='/getadmin'  element={superadmin?<Adminview/>:<Superlogin/>}/>
        <Route path='/addadmin'  element={superadmin?<Adminadd/>:<Superlogin/>}/>
        <Route path='/editadmin/:id'  element={superadmin?<AdminEdit/>:<Superlogin/>}/>
        <Route path='/singleview/:id'  element={superadmin?<Individualview/>:<Superlogin/>}/>
        <Route path='/transaction' element={superadmin?<TransactionTable/>:<Superlogin/>}/>
        <Route path="*" element={<PageNotFound />} />
       


      
    </Routes>
 
    </fragments>
  )
}

export default Superadmin
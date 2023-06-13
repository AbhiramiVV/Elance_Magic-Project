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
import Venuecat from '../Pages/Admin/Venuecat';
import VenuecatAdd from '../Pages/Admin/VenuecatAdd';
import VenueDisplay from '../Pages/Admin/VenueDisplay';
import Venuesingle from '../Pages/Admin/Venuesingle';
import VenuecollectAdd from '../Pages/Admin/VenuecollectAdd';
import VenueEdit from '../Pages/Admin/VenueEdit';
import DecorDisplay from '../Pages/Admin/DecorDisplay';
import DecorAdd from '../Pages/Admin/DecorAdd';
import Decorsingle from '../Pages/Admin/Decorsingle';
import DecorEdit from '../Pages/Admin/DecorEdit';
import Photoview from '../Pages/Admin/Photoview';
import PhotoAdd from '../Pages/Admin/PhotoAdd';
import PhotoSingle from '../Pages/Admin/PhotoSingle';
import PhotoEdit from '../Pages/Admin/PhotoEdit';
import PageNotFound from '../Component/PageNotFound';
import Catering from '../Pages/Admin/Catering';
import CateringAdd from '../Pages/Admin/CateringAdd';
import CateringView from '../Pages/Admin/CateringView';
import CateringEdit from '../Pages/Admin/CateringEdit';

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
        <Route path='/Venueview'  element={admin?<Venuecat/>:<Adminlogin/>}/>
        <Route path='/VenueAdd'  element={admin?<VenuecatAdd/>:<Adminlogin/>}/>
        <Route path='/venueDisplay'  element={admin?<VenueDisplay/>:<Adminlogin/>}/>
        <Route path='/venuecollectadd'  element={admin?<VenuecollectAdd/>:<Adminlogin/>}/>
        <Route path='/venuesingle/:id'  element={admin?<Venuesingle/>:<Adminlogin/>}/>
        <Route path='/venueEdit/:id'  element={admin?<VenueEdit/>:<Adminlogin/>}/>
        <Route path='/Decordisplay'  element={admin?<DecorDisplay/>:<Adminlogin/>}/>
        <Route path='/Decoradd'  element={admin?<DecorAdd/>:<Adminlogin/>}/>
        <Route path='/decorsingleview/:id'  element={admin?<Decorsingle/>:<Adminlogin/>}/>
        <Route path='/decorEdit/:id'  element={admin?<DecorEdit/>:<Adminlogin/>}/>
        <Route path='/photographerview'  element={admin?<Photoview/>:<Adminlogin/>}/>
        <Route path='/photographeradd'  element={admin?<PhotoAdd/>:<Adminlogin/>}/>
        <Route path='/photosingleview/:id' element={admin?<PhotoSingle/>:<Adminlogin/>}/>
        <Route path='/photoEdit/:id'  element={admin?<PhotoEdit/>:<Adminlogin/>}/>
        <Route path='/catering'  element={admin?<Catering/>:<Adminlogin/>}/>
        <Route path='/addCatering'  element={admin?<CateringAdd/>:<Adminlogin/>}/>
        <Route path='/singleCatering/:id' element={admin?<CateringView/>:<Adminlogin/>}/>
        <Route path='/cateringedit/:id'  element={admin?<CateringEdit/>:<Adminlogin/>}/>

        <Route path="*" element={<PageNotFound />} />
       </Routes>

    </fragments>
  )
}

export default Admin    
import React, { useEffect, useState } from "react";
import Header from "../../Component/Header";
import hi from '../../assets/hi.jpg'
import photograph from "../../assets/testimonial.jpg";
import venu from "../../assets/venue.jpg";
import food from "../../assets/foods.jpg"
import { Link } from "react-router-dom";
import axios from "../../instance/axios";
import { useAuthContext } from "../../Hooks/useAuthContext";

function Bookpage () {
 const{user}=useAuthContext()
 const[photo,setPhoto]=useState(null)
 const[venue,setVenue]=useState(null)
 const[decor,setDecor]=useState(null)
console.log(user)



  return (
    <div>
     <Header />
     
     
     <div className="w-full ">
     <div class="relative grid h-[30rem] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
  <div class="absolute inset-0 m-0 h-30 overflow-hidden rounded-none bg-transparent bg-[url('https://images.pexels.com/photos/587441/pexels-photo-587441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none w-full">
    <div class="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50"></div>
  </div>
  <div class="relative p-6 py-14 px-6 md:px-12 w-full">
    <h2 class="mb-6 block font-sans text-6xl font-medium leading-[1.5] tracking-normal font-third text-white antialiased">
    What will you choose?.
    </h2>
  
  </div>
</div>
<div className="flex justify-center items-center py-4">
<Link to='/details'><button
  type="button"
  class="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-2xl font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]" >
 Click To View Your Orders
</button></Link>
</div>

       <div className="w-full  overflow-x-hidden flex justify-center  py-0 items-center overflow mx-auto">
       
         <div
           id="slider"
           className="h-full flex lg:gap-8 md:gap-6 gap-10 items-center justify-start transition ease-out mt-10 duration-700"
         >
             
           <div className="flex flex-shrink-0 relative w-full sm:w-auto">
          <img
               src={photograph}
               alt="black chair and white table"
               className="object-cover object-center w-80 h-full"
             />
             <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
               <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white dark:text-gray-900"></h2>
               <div className="flex h-full items-end pb-6">
               <Link to='/photo'> <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white dark:text-gray-900">
               PHOTOGRAPHY
                 </h3></Link>
               </div>
             </div>
           </div>
           
           <div className="flex flex-shrink-0 relative w-full sm:w-auto">
           <img
               src={venu}
               alt="black chair and white table"
               className="object-cover object-center w-80 h-full"
             />
             <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
               <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white dark:text-gray-900"></h2>
               <div className="flex h-full items-end pb-6">
                <Link to='/Decor'><h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white dark:text-gray-900">
                   DECORATION
                 </h3></Link> 
               </div>
             </div>
           </div>
           <div className="flex flex-shrink-0 relative w-full sm:w-auto">
           <img
               src={hi}
               alt="black chair and white table"
               className="object-cover object-center w-80 h-full"
             />
             <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
               <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white dark:text-gray-900"></h2>
               <div className="flex h-full items-end pb-6">
               <Link to='/venue'>  <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white dark:text-gray-900">
                   VENUE
                 </h3></Link>
               </div>

             </div>
           </div>
           <div className="flex flex-shrink-0 relative w-full sm:w-auto">
           <img
               src={food}
               alt="black chair and white table"
               className="object-cover object-center w-80 h-full"
             />
             <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
               <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white dark:text-gray-900"></h2>
               <div className="flex h-full items-end pb-6">
               <Link to='/catering'>  <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white dark:text-gray-900">
                   FOODS & DRINKS
                 </h3></Link>
               </div>

             </div>
           </div>
           <div className="flex flex-shrink-0 relative w-full sm:w-auto">
           <img
               src={hi}
               alt="black chair and white table"
               className="object-cover object-center w-80 h-full"
             />
             <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
               <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white dark:text-gray-900"></h2>
               <div className="flex h-full items-end pb-6">
               <Link to='/venue'>  <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white dark:text-gray-900">
                   VENUE
                 </h3></Link>
               </div>

             </div>
           </div>
           
       
         </div>
     
       </div>


<div className="w-full flex flex-wrap justify-center gap-3 items-center mt-9">
 
</div>


</div>




    </div>
  )
  }







export default Bookpage;

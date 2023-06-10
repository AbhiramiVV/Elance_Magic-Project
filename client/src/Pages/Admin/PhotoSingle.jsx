import React, { useEffect, useState } from "react";
import Adminsidebar from "../../Component/Adminsidebar";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "../../instance/axios";
import { useAuthContext } from "../../Hooks/useAuthContext";

function PhotoSingle() {
  const { id } = useParams();
  console.log(id);
const{admin}=useAuthContext()
  const [pname, setPname] = useState("");
  const [pdesc, setPdesc] = useState("");
  const [pemail, setPemail] = useState("");
  const [pmobile, setPmobile] = useState("");
  const [paddress, setPaddress] = useState("");
  const [pexperiance, setPexperience] = useState("");
  const [rate, setRate] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const viewPhotoSingle = async () => {
      try {
        const res = await axios.get(`/vendor/singlePhotographer/${id}`,{
          headers: {
            Authorization: `${admin.token}`,
          },
        });
        const photosingle = res.data;
        console.log(photosingle);
        setPname(photosingle.pname);
        setPdesc(photosingle.pdesc);
        setPemail(photosingle.pemail);
        setPmobile(photosingle.pmobile);
        setPaddress(photosingle.paddress);
        setPexperience(photosingle.pexperiance);
        setRate(photosingle.rate);
        setImage(photosingle.image);
      } catch (error) {
        console.log(error);
      }
    };
    viewPhotoSingle();
  }, [id]);

  return (
    <>
      <div className="flex gap-24 bg-white">
       
       <Adminsidebar/>

       {/* <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"> * */}

       <div class="flex flex-col md:lg:xl:flex-row bg-white">
         <div class="h-screen w-screen md:lg:xl:w-1/2 bg-white flex flex-wrap justify-center content-center">
           {/* <div class="h-screen w-screen md:lg:xl:w-1/2 bg-white flex flex-wrap justify-center content-center shadow-2xl "> */}

           <div class="bg-white p-8 rounded-xl w-96 shadow-2xl mx-auto flex flex-col items-center justify-center">
             <div class="flex justify-between mb-4 text-center mx-auto">
               <div>
                 <img
                   src={`http://localhost:5000/uploads/${image[0].files[0].filename}`}
                   className="w-32 rounded-full mx-auto"
                   alt="Avatar"
                 />
                 <p class="text-lg font-semibold text-neutral-700">{pname}</p>
                 <p class="mt-0.5  text-black text-sm">
                   <span className="text-black font-extrabold">Email:</span>{" "}
                   {pemail}
                 </p>
                 <p class="mt-0.5  text-black text-sm">
                   <span className="text-black font-extrabold">Address:</span>{" "}
                   {paddress}
                 </p>
                 <p class="mt-0.5  text-black text-sm">
                   <span className="text-black font-extrabold">Mobile:</span>{" "}
                   {pmobile}
                 </p>
                
                 <p class="mt-0.5  text-black text-sm">
                   <span className="text-red-900 font-extrabold">
                     Experiance:
                   </span>{" "}
                   {pexperiance} years
                 </p>
                 <p class="mt-0.5  text-black text-sm">
                   <span className="text-red-900 font-extrabold">Rate:</span>{" "}
                   {rate}
                 </p>
               </div>
             </div>

             <span class="text-orange-500   px-3 text-sm py-1.5 bg-red-50 rounded-lg font-bold">
               {pdesc}
             </span>
           </div>
         </div>
         <div class="md:lg:xl:w-1/2 bg-white flex flex-wrap justify-end content-center mx-auto">
           <div class="grid grid-cols-2 gap-2 mt-20 mr-8">
             <div class=" h-64 rounded-lg overflow-hidden">
               <img class="object-cover" src={image[0]} alt="" />
             </div>
             <div class="w-full h-64 rounded-lg overflow-hidden">
               <img class="object-cover" src={image[1]} alt="" />
             </div>
             <div class=" h-64 rounded-lg overflow-hidden">
               <img class="  object-cover" src={image[3]} alt="" />
             </div>
             <div class=" h-64 rounded-lg overflow-hidden">
               <img class="object-cover" src={image[4]} alt="" />
             </div>
           </div>
         </div>
       </div>
     </div>
   </>
 );
}


export default PhotoSingle;

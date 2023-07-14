import React, { useEffect, useState } from "react";
import Adminsidebar from "../../Component/Adminsidebar";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
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
console.log(image,'00000000000000');
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
                  src={`http://localhost:5000/uploads/${image[0]?.files[0]?.filename}`}
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
         <div className="md:lg:xl:w-1/2 bg-white flex flex-wrap justify-end content-center mx-auto">
            <div className="grid grid-cols-2 gap-2 mt-20 mr-8">
              <Carousel showThumbs={false}>
                {image[0]?.files.slice(1).map((file, index) => (
                  <div key={index}>
                    <img
                      src={`http://localhost:5000/uploads/${file.filename}`}
                      alt={`Carousel Item ${index}`}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
       </div>
     </div>
   </>
 );
}


export default PhotoSingle;

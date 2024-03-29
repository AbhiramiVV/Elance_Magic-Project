import React, { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Adminsidebar from "../../Component/Adminsidebar";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "../../instance/axios";
import { useAuthContext } from "../../Hooks/useAuthContext";

function CateringView() {
    const{admin}=useAuthContext()
    const { id } = useParams();
    console.log(id);
  
    const [name, setname] = useState("");
    const [desc, setdesc] = useState("");
    const [email, setemail] = useState("");
    const [mobile, setmobile] = useState("");
    const [type, setType] = useState("");
    const [manager, setmanager] = useState("");
    const [rent, setRent] = useState("");
    const [menu,setMenu]=useState("");
    const [image, setImage] = useState("");
    const [address,setAddress]=useState("");
    useEffect(() => {
      const viewCateringSingle = async () => {
        try {
          const res = await axios.get(`/vendor/singleCatering/${id}`,{
            headers: {
              Authorization: `${admin.token}`,
            },
          });
          const Cateringsingle = res.data;
          setname(Cateringsingle.name);
          setdesc(Cateringsingle.desc);
          setemail(Cateringsingle.email);
          setmobile(Cateringsingle.mobile);
          setType(Cateringsingle.type);
          setmanager(Cateringsingle.manager);
          setRent(Cateringsingle.rent);
          setMenu(Cateringsingle.menu)
          setImage(Cateringsingle.image);
          setAddress(Cateringsingle.address)
        } catch (error) {
          console.log(error);
        }
      };
      viewCateringSingle();
    }, [id]);
  
    return (
      <>
        <div className="flex gap-24 bg-white">
          <Adminsidebar />
  
          <div class="flex flex-col md:lg:xl:flex-row bg-white">
            <div class="h-full w-full md:lg:xl:w-1/2 bg-white flex flex-wrap justify-center content-center">
              {/* <div class="h-screen w-screen md:lg:xl:w-1/2 bg-white flex flex-wrap justify-center content-center shadow-2xl "> */}
  
              <div class="bg-white p-8 rounded-xl w-96 shadow-2xl mx-auto flex flex-col items-center justify-center" >
                <div class="flex justify-between mb-4 text-center mx-auto">
                  <div>
                    <img
                    src={`https://server.skoshoes.store/uploads/${image[0]?.files[0]?.filename}`}
                      className="w-32 rounded-full mx-auto"
                      alt="Avatar"
                    />
                    <p class="text-lg font-semibold text-neutral-700">{name}</p>
                    <p class="mt-0.5  text-black text-md">
                      <span className="text-black font-extrabold">Category:</span>
                      {type}
                    </p>
                    <p class="mt-0.5  text-black text-md">
                      <span className="text-black font-extrabold">Manager:</span>
                      {manager}
                    </p>
                    <p class="mt-0.5  text-black text-md">
                      <span className="text-black font-extrabold">Email:</span>
                      {email}
                    </p>
                    <p class="mt-0.5  text-black text-md">
                      <span className="text-black font-extrabold">Mobile:</span>
                      {mobile}
                    </p>
                    <p class="mt-0.5  text-black text-md">
                      <span className="text-black font-extrabold">Address:</span>
                      {address}
                    </p>
                    <p class="mt-0.5  text-black text-md">
                      <span className="text-black font-extrabold">Menu:</span>
                      {menu}
                    </p>
                   
                    <p class="mt-0.5  text-black text-md">
                      <span className="text-red-900 font-extrabold">Rate:</span>{" "}
                      {rent}
                    </p>
                  </div>
                </div>
  
                <span class="text-orange-500   px-3 text-sm py-1.5 bg-red-50 rounded-lg font-bold">
                  {desc}
                </span>
              </div>
            </div>
            <div className="md:lg:xl:w-1/2 bg-white flex flex-wrap justify-end content-center mx-auto">
            <div className="grid grid-cols-2 gap-2 mt-20 mr-8">
              <Carousel showThumbs={false}>
                {image[0]?.files.map((file, index) => (
                  <div key={index}>
                    <img
                      src={`https://server.skoshoes.store/uploads/${file.filename}`}
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

export default CateringView

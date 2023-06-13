import React, { useEffect, useState } from "react";
import Adminsidebar from "../../Component/Adminsidebar";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "../../instance/axios";
import { useAuthContext } from "../../Hooks/useAuthContext";
function Venuesingle() {
  const { id } = useParams();

  const{admin}=useAuthContext()
  const [name, setname] = useState("");
  const [manager, setmanager] = useState("");
  const [type, setType] = useState("");
  const [seats, setseats] = useState("");
  const [description, setdescription] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [address, setaddress] = useState("");
  const [location, setlocation] = useState("");
  const [rent, setRent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const viewvenueSingle = async () => {
      try {
       
        const res = await axios.get(`/vendor/singleVenue/${id}`,{
          headers: {
            Authorization: `${admin.token}`,
          },
        });
        const venuesingle = res.data;
        console.log(venuesingle);
        setname(venuesingle.name);
        setdescription(venuesingle.description);
        setType(venuesingle.type);
        setemail(venuesingle.email);
        setmobile(venuesingle.mobile);
        setaddress(venuesingle.address);
        setlocation(venuesingle.location);
        setmanager(venuesingle.manager);
        setseats(venuesingle.seats);
        setRent(venuesingle.rent);
        setImage(venuesingle.image);
      } catch (error) {
        console.log(error);
      }
    };
    viewvenueSingle();
  }, [id]);

  return (
    <>
      <div className="flex gap-24 bg-white">
        <Adminsidebar />

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
                    <span className="text-black font-extrabold">
                      Location:
                    </span>{" "}
                    {location}
                  </p>
                  <p class="mt-0.5  text-black text-md">
                    <span className="text-red-900 font-extrabold">Seats:</span>{" "}
                    {seats}
                  </p>
                  <p class="mt-0.5  text-black text-md">
                    <span className="text-red-900 font-extrabold">Rate:</span>{" "}
                    {rent}
                  </p>
                </div>
              </div>

              <span class="text-orange-500   px-3 text-sm py-1.5 bg-red-50 rounded-lg font-bold">
                {description}
              </span>
            </div>
          </div>
          <div class="md:lg:xl:w-1/2 bg-white flex flex-wrap justify-end content-center mx-auto">
            <div class="grid grid-cols-2 gap-2 mt-20 mr-8">
              <div class=" rounded-lg overflow-hidden">
                <img class="object-cover" src={image[0]} alt="" />
              </div>
              <div class="rounded-lg overflow-hidden">
                <img class="object-cover" src={image[1]} alt="" />
              </div>
              <div class=" rounded-lg overflow-hidden">
                <img class="  object-cover" src={image[2]} alt="" />
              </div>
              <div class="rounded-lg overflow-hidden">
                <img class="object-cover" src={image[3]} alt="" />
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  );
}

export default Venuesingle;

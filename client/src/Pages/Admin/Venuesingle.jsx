import React, { useEffect, useState } from "react";
import Adminsidebar from "../../Component/Adminsidebar";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "../../instance/axios";
import { useAuthContext } from "../../Hooks/useAuthContext";

function Venuesingle() {
  const { id } = useParams();
  const { admin } = useAuthContext();

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
    axios.get(`/vendor/singleVenue/${id}`, {
      headers: {
        Authorization: `${admin.token}`,
      },
    })
      .then((res) => {
        const venuesingle = res.data;
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <div className="flex gap-24 bg-white">
        <Adminsidebar />

        <div className="flex flex-col md:lg:xl:flex-row bg-white">
          <div className="h-screen w-screen md:lg:xl:w-1/2 bg-white flex flex-wrap justify-center content-center">
            <div className="bg-white p-8 rounded-xl w-96 shadow-2xl mx-auto flex flex-col items-center justify-center">
              <div className="flex justify-between mb-4 text-center mx-auto">
                <div>
                  <img
                    src={image ? `http://localhost:5000/uploads/${image.files[0]?.filename}` : ''}
                    className="w-32 rounded-full mx-auto"
                    alt="Avatar"
                  />
                  <p className="text-lg font-semibold text-neutral-700">{name}</p>
                  <p className="mt-0.5 text-black text-md">
                    <span className="text-black font-extrabold">Category:</span> {type}
                  </p>
                  <p className="mt-0.5 text-black text-md">
                    <span className="text-black font-extrabold">Manager:</span> {manager}
                  </p>
                  <p className="mt-0.5 text-black text-md">
                    <span className="text-black font-extrabold">Email:</span> {email}
                  </p>
                  <p className="mt-0.5 text-black text-md">
                    <span className="text-black font-extrabold">Mobile:</span> {mobile}
                  </p>
                  <p className="mt-0.5 text-black text-md">
                    <span className="text-black font-extrabold">Address:</span> {address}
                  </p>
                  <p className="mt-0.5 text-black text-md">
                    <span className="text-black font-extrabold">Location:</span> {location}
                  </p>
                  <p className="mt-0.5 text-black text-md">
                    <span className="text-red-900 font-extrabold">Seats:</span> {seats}
                  </p>
                  <p className="mt-0.5 text-black text-md">
                    <span className="text-red-900 font-extrabold">Rate:</span> {rent}
                  </p>
                </div>
              </div>

              <span className="text-orange-500 px-3 text-sm py-1.5 bg-red-50 rounded-lg font-bold">
                {description}
              </span>
            </div>
          </div>

          <div className="md:lg:xl:w-1/2 bg-white flex flex-wrap justify-end content-center mx-auto">
            <div className="grid grid-cols-2 gap-2 mt-20 mr-8">
              <Carousel showThumbs={false}>
                {Array.isArray(image.files) &&
                  image.files.map((file, index) => (
                    <div key={index}>
                      <img
                        src={file ? `http://localhost:5000/uploads/${file.filename}` : ''}
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

export default Venuesingle;

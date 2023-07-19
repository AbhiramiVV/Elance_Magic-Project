import React, { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Adminsidebar from "../../Component/Adminsidebar";
import { useParams } from "react-router-dom";
import axios from "../../instance/axios";
import { useAuthContext } from "../../Hooks/useAuthContext";

function MakeupView() {
  const { admin } = useAuthContext();
  const { id } = useParams();
  console.log(id);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [type, setType] = useState("");
  const [manager, setManager] = useState("");
  const [rent, setRent] = useState("");
  const [image, setImage] = useState([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const viewMakeupSingle = async () => {
      try {
        console.log(id, "iddddddddddddddddddddddddddd");
        const res = await axios.get(`/vendor/singleMakeup/${id}`, {
          headers: {
            Authorization: `${admin.token}`,
          },
        });
        const MakeupSingle = res.data;
        setName(MakeupSingle.name);
        setDesc(MakeupSingle.desc);
        setEmail(MakeupSingle.email);
        setMobile(MakeupSingle.mobile);
        setType(MakeupSingle.type);
        setManager(MakeupSingle.manager);
        setRent(MakeupSingle.rent);
        setImage(MakeupSingle.image);
        setAddress(MakeupSingle.address);
        console.log(MakeupSingle, "huhjhgghg");
      } catch (error) {
        console.log(error);
      }
    };
    viewMakeupSingle();
  }, [admin.token, id]);

  return (
    <>
      <div className="flex gap-24 bg-white">
        <Adminsidebar />

        <div className="flex flex-col md:lg:xl:flex-row bg-white">
          <div className="h-full w-full md:lg:xl:w-1/2 bg-white flex flex-wrap justify-center content-center">
            <div className="bg-white p-8 rounded-xl w-96 shadow-2xl mx-auto flex flex-col items-center justify-center">
              <div className="flex justify-between mb-4 text-center mx-auto">
                <div>
                  <img
                    src={`https://server.skoshoes.store/uploads/${image[0]?.files[0]?.filename}`}
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
                    <span className="text-red-900 font-extrabold">Rate:</span> {rent}
                  </p>
                </div>
              </div>
              <span className="text-orange-500 px-3 text-sm py-1.5 bg-red-50 rounded-lg font-bold">
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

export default MakeupView;

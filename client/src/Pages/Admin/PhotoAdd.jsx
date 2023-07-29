import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Adminsidebar from "../../Component/Adminsidebar";
import axios from "../../instance/axios";
import { useAuthContext } from "../../Hooks/useAuthContext";


const PhotoAdd = () => {
  const {admin}=useAuthContext();
  const [data, setdData] = useState("");
  const Navigate = useNavigate();

  
  const [pname, setpName] = useState("");
  const [pemail, setpEmail] = useState("");
  const [pmobile, setpMobile] = useState("");
  const [paddress, setpAddress] = useState("");
  const [pexperiance, setpexperiance] = useState("");
  const [rate, setRate] = useState("");
const [pdesc, setPdesc] = useState("");
  const [files, setFiles] = useState([]);
  const [imgeError, setImageError] = React.useState(false);
  const id=admin.adminExist[0]._id
  const handleImageChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles([...selectedFiles]);
  };
  const addphotographer = async (e) => {
  
    e.preventDefault();
    const formData = new FormData();
    formData.append("VendorId",id);
    formData.append("pname", pname);
    formData.append("pdesc", pdesc);
    formData.append("pemail", pemail);
    formData.append("pmobile", pmobile);
    formData.append("paddress", paddress);
    formData.append("pexperiance", pexperiance);
    formData.append("rate", rate);
    
    for (let i = 0; i < files.length; i++) {
        formData.append(`files`, files[i]);
      }


    try {
      const response = await axios
        .post("/vendor/addPhotographer", formData, {
          headers: {
            Authorization: `${admin.token}` ,  'content-type': 'multipart/form-data'
    
    
        },
        });
          if (response.data.message) {
            Navigate("/vendor/photographerview");
          }    
    } catch (error) {}
  };

  return (
    <div>
      <div className="flex gap-24">
        <Adminsidebar />

        <div className="py-2">
          <section className=" py-1 bg-blueGray-50 ">
            <div className="w-full lg:w-full px-4 mx-auto mt-6">
              <form onSubmit={addphotographer} encType="multipart/form-data">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-l-emerald-900">
                  <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-center">
                      <h6 className="text-blueGray-700 text-xl font-bold">
                        PHOTOGRAPHER MANAGEMENT
                      </h6>
                    </div>
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="flex flex-wrap">
                     
                      
                     
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlfor="grid-password"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="pname"
                            onChange={(e) => setpName(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
<div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlfor="grid-password"
                          >
                            Description
                          </label>
                          <textarea
                            type="text"
                            name="pdesc"
                            onChange={(e) => setPdesc(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlfor="grid-password"
                          >
                             Email
                          </label>
                          <input
                            type="text"
                            name="pemail"
                            onChange={(e) => setpEmail(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlfor="grid-password"
                          >
                            Mobile No
                          </label>
                          <input
                            type="text"
                            name="pmobile"
                            onChange={(e) => setpMobile(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlfor="grid-password"
                          >
                          Address
                          </label>
                          <input
                            type="text"
                            name="paddress"
                            onChange={(e) => setpAddress(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlfor="grid-password"
                          >
                            Work experiance
                          </label>
                          <input
                            type="text"
                            name="pexperiance"
                            onChange={(e) => setpexperiance(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlfor="grid-password"
                          >
                            Rate Per Day
                          </label>
                          <input
                            type="text"
                            name="rate"
                            onChange={(e) => setRate(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                     
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2 mt-5"
                            htmlFor="image-upload"
                          >
                            Upload Image
                          </label>
                          <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                          {imgeError && (
                            <p className="mx-3 text-red-500 font-Ariza">
                              Only jpg | jpeg | png are allowed
                            </p>
                          )}
                        </div>
                      </div>
                     </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                  </div>
                </div>
                <div className="button flex justify-center">
                  <button
                    className="bg-black text-white active:bg-pink-600 font-bold uppercase text-xl px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PhotoAdd;

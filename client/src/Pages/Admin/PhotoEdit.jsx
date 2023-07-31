import React, { useEffect, useState } from 'react'

import axios from '../../instance/axios'
import {useNavigate,useParams } from 'react-router-dom';
import Adminsidebar from '../../Component/Adminsidebar';
import { useAuthContext } from '../../Hooks/useAuthContext';

function PhotoEdit() {
  const {id}=useParams();
  //const history = useHistory();
  const Navigate=useNavigate()
  const {admin}=useAuthContext();
  const [pname, setname] = useState("");
  const [pemail, setemail] = useState("");
  const [pexperiance, setExperiance] = useState("");
  const [pdesc, setDesc] = useState("");
  const [paddress, setAddress] = useState("");
  const [pmobile, setmobile] = useState("");
  const [rent, setRent] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`/vendor/singlePhotographer/${id}`, {
          headers: {
            Authorization: admin.token,
          },
        });
        const photo = response.data;
        setname(photo.pname);
        setemail(photo.pemail);
        setDesc(photo.pdesc);
        setAddress(photo.paddress);
        setmobile(photo.pmobile);
        setExperiance(photo.pexperiance);
        setRent(photo.rent);
        setFiles(photo.files);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchPhoto();
  }, [id]);
  const handleImageChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles([...selectedFiles]);
  };

const updatePhoto=async(e)=>{
  e.preventDefault()
  const formData = new FormData();
  formData.append("VendorId",id);
  formData.append("pname", pname);
  formData.append("pdesc", pdesc);
  formData.append("pemail", pemail);
  formData.append("pmobile", pmobile);
  formData.append("paddress", paddress);
  formData.append("pexperiance", pexperiance);
  formData.append("rate", rent);
  for (let i = 0; i < files.length; i++) {
      formData.append(`files`, files[i]);
    }
   
  await axios.put(`/vendor/photoedit/${id}`,formData,{
    headers: {
      Authorization: `${admin.token}` ,  'content-type': 'multipart/form-data'


  },})
  Navigate("/vendor/photographerview")
  
}

return (
  <div>
      <div className='flex gap-24'>
    <Adminsidebar/>
      
    <div className="py-2">
        <section className=" py-1 bg-blueGray-50 ">
          <div className="w-full lg:w-full px-4 mx-auto mt-6">
            <form onSubmit={updatePhoto} encType="multipart/form-data">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-l-emerald-900">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-center flex justify-center">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                      PHOTOGRAPHER MANAGEMENT
                    </h6>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-4">
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
                          name="name"
                          value={pname}
                          onChange={(e) => setname(e.target.value)}
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
                          value={paddress}
                          name="manager"
                          onChange={(e) => setAddress(e.target.value)}
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
                        Experiance
                        </label>
                        <input
                          type="text"
                          value={pexperiance}
                          name="manager"
                          onChange={(e) => setExperiance(e.target.value)}
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
                          name="email"
                          value={pemail}
                          onChange={(e) => setemail(e.target.value)}
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
                          name="mobile"
                          value={pmobile}
                          onChange={(e) => setmobile(e.target.value)}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Services
                        </label>
                        <textarea
                          name="desc"
                          value={pdesc}
                          onChange={(e) => setDesc(e.target.value)}
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
                          value={rent}
                          onChange={(e) => setRent(e.target.value)}
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
}

export default PhotoEdit
import React, { useEffect, useState } from 'react'

import axios from '../../instance/axios'
import {useNavigate,useParams } from 'react-router-dom';
import Adminsidebar from '../../Component/Adminsidebar';
import { useAuthContext } from '../../Hooks/useAuthContext';
function DecorEdit() {
  const {id}=useParams();
  const{admin}=useAuthContext()
    //const history = useHistory();
    const Navigate=useNavigate()
    
    console.log(id)
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [type, setType] = useState("");
    const [desc, setDesc] = useState("");
    const [manager, setmanager] = useState("");
    const [mobile, setmobile] = useState("");
    const [rent, setRent] = useState("");
    const [files, setFiles] = useState([]);


    useEffect(()=>{
        const fetchadmin=async()=>{
            const response = await axios.get(`/vendor/singleDecor/${id}`,{
              headers: {
                Authorization: `${admin.token}`
            },
            });
            const Decor=response.data;
            setname(Decor.name);
            setemail(Decor.email);
            setDesc(Decor.desc);
            setmanager(Decor.manager);
            setmobile(Decor.mobile)
            setType(Decor.type)
            setRent(Decor.rent)
            setFiles(Decor.files)
        }
        fetchadmin();
        

    },[id]);

const updateDecor=async(e)=>{
    e.preventDefault()
    const updateDecor={name,email,mobile,type,rent,desc,files};
    await axios.put(`/vendor/decoredit/${id}`,updateDecor,{
      headers: {
        Authorization: `${admin.token}` ,  'content-type': 'multipart/form-data'


    },})
    Navigate("/vendor/Decordisplay")
    
}

  return (
    <div>
        <div className='flex gap-24'>
      <Adminsidebar/>
        
      <div className="py-2">
          <section className=" py-1 bg-blueGray-50 ">
            <div className="w-full lg:w-full px-4 mx-auto mt-6">
              <form onSubmit={updateDecor} encType="multipart/form-data">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-l-emerald-900">
                  <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-center">
                      <h6 className="text-blueGray-700 text-xl font-bold">
                        DECORATION MANAGEMENT
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
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlfor="grid-password"
                          >
                            Type of Decoration
                          </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-8 leading-tight focus:outline-none focus:shadow-outline"
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value={''}>--Please select--</option>
                               
                                    <option value='Floral Decorations'>
                                    Floral Decorations
                                    </option>
                                    <option value='Lighting Effects'>
                                    Lighting Effects
                                    </option>
                                    <option value='Themed Decor'>
                                    Themed Decor
                                    </option>
                                    <option value='Balloon Decorations'>
                                    Balloon Decorations
                                    </option>
                                    <option value='Fabric Draping'>
                                    Fabric Draping
                                    </option>
                                    <option value='Table Settings'>
                                    Table Settings
                                    </option>
                                    <option value='Signage and Backdrops'>
                                    Signage and Backdrops
                                    </option>
                                    <option value='Hanging Installations'>
                                    Hanging Installations
                                    </option>
                                    <option value='Personalized Touches'>
                                    Personalized Touches
                                    </option>

                               
                            </select>
                            </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlfor="grid-password"
                          >
                            Manager
                          </label>
                          <input
                            type="text"
                            value={manager}
                            name="manager"
                            onChange={(e) => setmanager(e.target.value)}
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
                            value={email}
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
                            value={mobile}
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
                            Description
                          </label>
                          <textarea
                            name="desc"
                            value={desc}
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
                            name="rent"
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
  multiple={true}
  onChange={(e) => setFiles((e.target.files[0]))}
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

export default DecorEdit